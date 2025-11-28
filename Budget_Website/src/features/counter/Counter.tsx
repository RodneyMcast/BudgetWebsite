import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { increment, decrement, incrementByAmount } from './counterSlice'

export default function Counter() {
  const count = useSelector((s: RootState) => s.counter.value)
  const dispatch = useDispatch()
  const [amt, setAmt] = useState('5')

  return (
    <div>
      <h2>Counter</h2>
      <div>Value: {count}</div>
      <div style={{ marginTop: 8 }}>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
      <div style={{ marginTop: 8 }}>
        <input value={amt} onChange={e => setAmt(e.target.value)} style={{ width: 60 }} />
        <button onClick={() => dispatch(incrementByAmount(Number(amt) || 0))} style={{ marginLeft: 8 }}>
          Add Amount
        </button>
      </div>
    </div>
  )
}
