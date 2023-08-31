import { createSlice } from '@reduxjs/toolkit'
import { json } from 'react-router-dom'
import { toast } from 'react-toastify'

const themes = {
  winter: 'winter',
  dracula: 'dracula',
}
const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem('theme') || themes.winter
  document.documentElement.setAttribute('data-theme', theme)
  return theme
}

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user')) || ''
}

const defaultState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
}

export const userSlice = createSlice({
  name: 'user',
  initialState: defaultState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload.user
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    logoutUser: (state) => {
      state.user = null
      localStorage.removeItem('user')
      toast.success('Logged out successfully')
    },
    toggleTheme: (state) => {
      const newTheme =
        state.theme === themes.winter ? themes.dracula : themes.winter
      state.theme = newTheme
      document.documentElement.setAttribute('data-theme', state.theme)
      localStorage.setItem('theme', newTheme)
    },
  },
})

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions
export default userSlice.reducer
