import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: '01',
      pv: 2400,
      amt: 2400,
    },
    {
      name: '02',
      pv: 1398,
      amt: 2210,
    },
    {
      name: '03',
      pv: 9800,
      amt: 2290,
    },
    {
      name: '04',
      pv: 3908,
      amt: 2000,
    },
    {
      name: '05',
      pv: 4800,
      amt: 2181,
    },
    {
      name: '06',
      pv: 3800,
      amt: 2500,
    },
    {
      name: '07',
      pv: 4300,
      amt: 2100,
    },
  ];

const SimpleLines = () => {
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
