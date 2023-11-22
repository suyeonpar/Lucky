'use client'
import { faClover } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image'
import React, {useState} from 'react' // 중괄호안은 작명 불가능

interface contentInter {
  name: string;
  desc : string;
  keyword ?: string;
  index ?: string
}
interface today{
  title: string;
  date: string;
  content: contentInter[]

}

export default function Home() {

  const [gender, setGender] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>(""); //문자열로 전송되야해서 string
  const [month, setMonth] = useState<string>("1");
  const [time, setTime] = useState<string>("");

  const [resultToday, setResultToday] = useState<today | null>(null);
  const [resultTom, setResultTom] = useState(null);
  const [resultMonth, setResultMonth] = useState(null);



  const fetchData = async () =>{
    const res = await fetch(`/api?gender=${gender}&birthdate=${birthDate}&month=${month}&time=${time}`)
    const data = await res.json();
    setResultToday(data.result.day);
    setResultTom(data.result.tomorrow);
    setResultMonth(data.result.month);
    console.log(data.result.day);
    console.log(data.result.tomorrow);
    console.log(data.result.month);
     //console.log(data)
  }

  const birthChange =((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if(value.length <= 8 && /^[0-9]*$/.test(value)){
      setBirthDate(value);
    }
  })

  


  return (
    <>
    <div className="w-full mx-auto">
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-center">오늘의 운세 <FontAwesomeIcon icon={faClover} className='text-3xl text-green-500' /></h1>
      </div>
      <div className="max-w-7xl flex flex-wrap justify-between mt-10 mx-auto">
        <div className="basis-full text-center mb-20 md:basis-[25%]">
          <p className='text-xl font-bold mb-2'>성별</p>
          <button onClick={()=>{setGender("m")}} className={`border p-1 rounded-md mr-5 hover:bg-blue-400 hover:text-white ${gender === "m" ? "bg-blue-400 text-white" : ""}`}>남성</button>
          <button onClick={()=>{setGender("f")}} className={`border p-1 rounded-md hover:bg-pink-300 hover:text-white ${gender === "f" ? "bg-pink-300 text-white" : ""}`}>여성</button>
        </div>

        <div className='basis-full mb-20 text-center md:basis-[25%]'>
          <p className='text-xl font-bold mb-2'>생일</p>
          <span>생년월일 : </span>
          <input type='text' onChange={birthChange} value={birthDate} placeholder='생년월일(8자리)' className='border rounded-md' />
        </div>

        <div className="basis-full mb-20 text-center md:basis-[25%]">
          <p className='text-xl font-bold mb-2'>달</p>
          <span>달 : </span>
          <select value={month} onChange={(e)=>{setMonth(e.target.value)}} className='border rounded-md'>
            <option value="1">양력</option>
            <option value="2">음력 평달</option>
            <option value="3">음력 윤달</option>
          </select>
        </div>

        <div className='basis-full mb-20 text-center md:basis-[25%]'>
        <p className='text-xl font-bold mb-2'>시간</p>
          <span>시간</span>
          <select value={time} onChange={(e)=>setTime(e.target.value)} className='border rounded-md'>
            <option value="">모름</option>
            <option value="0">23:30 ~ 01:29</option>
            <option value="1">01:30 ~ 03:29</option>
            <option value="2">03:30 ~ 05:29</option>
            <option value="3">05:30 ~ 07:29</option>
            <option value="4">07:30 ~ 09:29</option>
            <option value="5">09:30 ~ 11:29</option>
            <option value="6">11:30 ~ 13:29</option>
            <option value="7">13:30 ~ 15:29</option>
            <option value="8">15:30 ~ 17:29</option>
            <option value="9">17:30 ~ 19:29</option>
            <option value="10">19:30 ~ 21:29</option>
            <option value="11">21:30 ~ 23:29</option>
          </select>
        </div>
        <div className="mx-auto max-w-7xl">
          <button className='border px-5 py-2 rounded-lg text-white bg-black' onClick={fetchData}>확인</button>
        </div>

      </div>
      <div className="mt-10 max-w-7xl flex justify-around mx-auto mb-10">
        <p>성별 : {gender}</p>
        <p>생년월일 : {birthDate}</p>
        <p>달 : {month}</p>
        <p>시간 : {time}</p>
      </div>
    </div>
      
      <div>
        {resultToday && (
          <>
          <div className='max-w-7xl mx-auto'>
            <div className='mb-5'>
              <h3 className='text-xl font-bold'>{resultToday.title}</h3>
              <p className='text-gray-400'>운세 날짜 : {resultToday.date}</p>
            </div>
            {resultToday.content.map((item, idx) => (
              <div key={idx} className='border-b mb-2'>
                <h3 className='text-bold text-lg mb-2 font-semibold'>{item.name}</h3>
                <p className='mb-3'>{item.desc}</p>
              </div>
            ))}
          </div>
          </>
        )}
      </div>
    </>
  )
}
