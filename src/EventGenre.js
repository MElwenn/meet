import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const EventGenre = ({ events }) => {
    const [data, setData] = useState([]);
    useEffect(() => { setData(() => getData()); }, [events]);

    const getData = () => {
        const genres = ['React', 'AngularJS', 'jQuery', 'Node', 'JavaScript'];
        const data = genres.map((genre) => { //genreData
            const value = events.filter(({ summary }) => summary.split('').includes(genre)).length; // with or witout blank?
            return { name: genre, value };
        });
        return data;
    };

    const COLORS = ['#0099FF', '#00CC99', '#FFCC33', '#FF9933', '#9966CC'];

    console.log(events);

    return (
        <ResponsiveContainer height={400} >
            <PieChart width={400} height={400} >
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} name={entry.name} />)
                    }
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default EventGenre;

/*const { PieChart, Pie, Sector, Cell } = Recharts;
const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 }];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const SimplePieChart = React.createClass({
    render() {
        return (
            <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
                <Pie
                    data={data}
                    cx={300}
                    cy={200}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                >
                    {
                        data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
            </PieChart>
        );
    }
})

let ReactDOM;
let EventGenre;

ReactDOM.render(
    <SimplePieChart />,
    document.getElementById('container')
); */