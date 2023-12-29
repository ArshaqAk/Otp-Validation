import { useEffect, useRef, } from 'react'
import './App.css'
import {Formik, useFormik} from 'formik'
const validate= (values)=>{
  const errors = {}
  if(Object.values(values.otp).some(data=>data==="")){
    errors.otp="This field is required"
  }
return errors
}
function App() {

  const formik= useFormik({
    initialValues:{
      otp:Array.from({length:6}).fill(""),
    },
    validate,
    onSubmit:values=>{
      console.log(values.otp.join(""));
    }
  })

  const inputRef= useRef({});

  useEffect(()=>{
    inputRef.current[0].focus();
    //paste
    inputRef.current[0].addEventListener("paste",pasteText);
    return ()=> inputRef.current[0].removeEventListener("paste",pasteText);
  },[])

  const pasteText =(event)=>{
    const pastedText= event.clipboardData.getData("text");
    const fieldvalues={}
    // eslint-disable-next-line no-undef
    Object.keys(otp).forEach((keys,index)=>{
      fieldvalues[keys]= pastedText[index]
    })
    // eslint-disable-next-line no-undef
    setOtp(fieldvalues);
    inputRef.current[5].focus()
  }

  const handleBackspace=(event,index)=>{
    if(event.key === "Backspace"){
     if(index>0){
      inputRef.current[index -1].focus();
     }
    }
  }


  const renderInput = () => {
    return formik.values.otp.map((value,index) => (
      <input
      ref={element=> inputRef.current[index]=element}
        key={index}
        type="text"
        value={value}
        name={index}
        className='w-16 h-12 rounded-md mr-3 text-center text-xl'
        onChange={(event)=>handleChange(event,index)}
        onKeyUp={(event)=>handleBackspace(event,index)}
      />
    ));
  };

      const handleChange =(event,index)=>{
        const {value} = event.target;

        if(/[a-z]/gi.test(value)) return;

        const currentOtp=[...formik.values.otp];
        currentOtp[index]= value.slice(-1)

        formik.setValues(prev=>({
          ...prev,
          otp: currentOtp,
          
        }))


       if(value && index<5){
        inputRef.current[index+1].focus()
       }

       }
  return (
    <form action="">
      <h3 className='text-3xl mb-5'>Please fill the otp</h3>
      <Formik>
    <div>
    {
            renderInput()
    }

    </div>
      </Formik>
    {
      formik.errors.otp && <p className='mt-2 text-sm text-red-500'>Please fill the fields</p>
    }

      <button type='button' onClick={formik.handleSubmit} className='mt-4 w-32 bg-[#3b3b3b] rounded border-solid border hover:bg-[#252525]'>Submit</button>
    </form>
  )
}

export default App
