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

export type LocalStorageCrudTime = LocalStorage["crudTime"]

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


export const useLocalStorage = (key: keyof LocalStorage) => {
  const [state, setState] = useState(() => {
    // Initialize the state
    try {
      const crudTimes = typeof window !== 'undefined' && window.localStorage.getItem(key)
      // Check if the local storage already has any values,
      // otherwise initialize it with the passed initialValue
      return (crudTimes ? JSON.parse(crudTimes) : localStorageInitialValues) as LocalStorage[typeof key]
    } catch (error) {
      console.log(error)
      return localStorageInitialValues[key]
    }
  })

  const setValue = (value: Partial<LocalStorageCrudTime> | undefined) => {
    try {
      // If the passed value is a callback function,
      //  then call it with the existing state.
      const valueToStore = value instanceof Function ? value(state) : value
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      setState(valueToStore)
    } catch (error) {
      console.log(error)
    }
  }

  return [state, setValue]
}

