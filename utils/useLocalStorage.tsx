"use client"
import { DbType } from "@/components/DbSelection/DbSelection"
import { useState } from "react"

type LocalStorage = {
  crudTime: {
    [K in DbType]: {
      createTime: number,
      readTime: number,
      updateTime: number,
      deleteTime: number,
    }
  }
}

type LocalStorageCrudTime = LocalStorage["crudTime"]

const localStorageInitialValues: LocalStorage = {
  crudTime: {
    mongo: {
      createTime: 0,
      readTime: 0,
      updateTime: 0,
      deleteTime: 0,
    },
    postgres: {
      createTime: 0,
      readTime: 0,
      updateTime: 0,
      deleteTime: 0,
    }
  }
}


export const useLocalStorage = (item: keyof LocalStorage) => {
  const [state, setState] = useState(() => {
    // Initialize the state
    try {
      const crudTimes = typeof window !== 'undefined' && window.localStorage.getItem(item)
      // Check if the local storage already has any values,
      // otherwise initialize it with the passed initialValue
      return (crudTimes ? JSON.parse(crudTimes) : localStorageInitialValues) as LocalStorageCrudTime
    } catch (error) {
      console.log(error)
    }
  })

  const setValue = (value: Partial<LocalStorage>) => {
    try {
      // If the passed value is a callback function,
      //  then call it with the existing state.
      const valueToStore = value instanceof Function ? value(state) : value
      window.localStorage.setItem(item, JSON.stringify(valueToStore))
      setState({ ...state, item: value))
    } catch (error) {
      console.log(error)
    }
  }

  return [state, setValue]
}

