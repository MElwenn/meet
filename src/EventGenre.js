import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const EventGenre = ({ events }) => {
    const [data, setData] = useState([]);
    useEffect(() => { setData(() => getData()); }, [events]);

    const getData = () => {
        const genres = ['React', 'AngularJS', 'jQuery', 'Node', 'JavaScript'];
        const data = genres.map((genre) => { //genreData
            const value = events.filter(({ summary }) => summary.split(' ').includes(genre)).length; // with or witout blank?
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
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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

