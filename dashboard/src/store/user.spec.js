import useStore from '../hooks/useStore'
import { clearCurrentUser, resetUserStore, setApiKey, setCurrentUser } from './user'

describe('UserStore', () => {
  afterEach(() => {
    resetUserStore()
  })
  it('should set current user', () => {
    const store = useStore()
    setCurrentUser({ name: 'Gustavo' })
    
  })
  it('should set api_key on current user', () => {
    const store = useStore()
    setApiKey('123')
    expect(store.User.currentUser.apiKey).toBe('123')
  })
  it('should clean current user', () => {
    const store = useStore()
    setCurrentUser({ name: 'Gustavo' })
    expect(store.User.currentUser.name).toBe('Gustavo')
    clearCurrentUser()
    expect(store.User.currentUser.name).toBeFalsy()
  })
})
