import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is logged in on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          // Get user details from users table
          const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', user.email)
            .single()

          if (error) throw error
          setUser(data)
        }
      } catch (err) {
        console.error('Auth check error:', err)
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  // Sign Up
  const signup = async (email, password, name) => {
    setLoading(true)
    setError(null)
    try {
      // First check if user exists in our users table
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (existingUser) {
        return { success: false, error: 'Email already registered. Please login instead.' }
      }

      // Try Supabase Auth signup
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        }
      })

      if (authError) {
        if (authError.message && authError.message.includes('already registered')) {
          return { success: false, error: 'Email already registered. Please login instead.' }
        }
        throw authError
      }

      // Add user to users table with verified status
      const { data, error: dbError } = await supabase
        .from('users')
        .insert([
          {
            email,
            password,
            name,
            role: 'user'
          }
        ])
        .select()
        .single()

      if (dbError) throw dbError

      setUser(data)
      return { success: true }
    } catch (err) {
      const errorMsg = err.message || 'Signup failed'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  // Log In
  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (authError) throw authError

      // Get user from users table
      const { data, error: dbError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (dbError) throw dbError

      setUser(data)
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Log Out
  const logout = async () => {
    setLoading(true)
    try {
      await supabase.auth.signOut()
      setUser(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Update User
  const updateUser = async (updates) => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error
      setUser(data)
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      signup,
      login,
      logout,
      updateUser,
      isLoggedIn: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
