import { CodeNode } from '@flyde/core'
import { Ok, Err } from './types/common'

export const HTTPGet: CodeNode = {
  id: 'HttpGet',
  displayName: 'HTTP GET',
  inputs: {
    URL: { description: 'リクエスト先のURL' },
  },
  outputs: {
    Result: {},
  },
  run: async ({ URL: url }, { Result: result }) => {
    try {
      const res = await fetch(url as string)
      const data = await res.json()
      result.next(Ok(data))
    } catch (e) {
      result.next(Err(String(e)))
    }
  },
}

export const HTTPPost: CodeNode = {
  id: 'HttpPost',
  displayName: 'HTTP POST',
  inputs: {
    URL: { description: 'リクエスト先のURL' },
    ボディ: { description: '送信するJSONデータ（オブジェクト）' },
  },
  outputs: {
    Result: {},
  },
  run: async ({ URL: url, ボディ }, { Result: result }) => {
    try {
      const res = await fetch(url as string, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ボディ),
      })
      const data = await res.json()
      result.next(Ok(data))
    } catch (e) {
      result.next(Err(String(e)))
    }
  },
}
