import "./styles.css"

export function Leaves({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div /* id="leaves" */>
        <i></i>
        <i></i>
        <i></i>
        {/* <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i> */}
      </div>
      {children}
    </div>
  )
}
