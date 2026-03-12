import { useUIStore } from '../stores/uiStore'

interface UseCollectionsReturn {
  loginSession: (sessionId: string) => Promise<void>
}

export const useUser = (): UseCollectionsReturn => {
  const { setUser  } = useUIStore()

  const loginSession = async (sessionId: string) => {
    try {
      const response = await fetch('https://city-of-gold-exam-backend.onrender.com/api/favorites/user/getOrCreate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      })

      if (!response.ok) throw new Error('Failed to fetch books')

      const { data: user } = await response.json()
      console.log('user', user)
      setUser(user);
    } catch (error) {
      console.error(`Error: ${error}`)
      throw error;
    }
  }

  return {
    loginSession,
  }
}
