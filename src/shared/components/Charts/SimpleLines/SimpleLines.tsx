import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const SimpleLines = ({data}: {data: {name: string, pv: number, amt: number}[]}) => {
  return (
    <div className='w-full h-full'>
       <ResponsiveContainer width="100%" height="100%">
        <LineChart
            data={data}
        >
          <XAxis dataKey="name" />
          <YAxis  />
          <Tooltip />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SimpleLines
