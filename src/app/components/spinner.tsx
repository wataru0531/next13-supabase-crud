/**************************************************************

Spinner   ローディング中にかます

***************************************************************/


type SpinnerProps = {
  color?: string,
}

const Spinner = ({ color = "border-blue-500" }: SpinnerProps) => {

  return(
    <div className="my-16 flex justify-center">
      <div 
        className={`h-10 w-10 animate-spin rounded-full border-4 ${ color } border-t-transparent`} 
      />
    </div>
  )
}

export default Spinner;