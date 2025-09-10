import { PieChart, Pie, Cell } from "recharts";
import css from "./Diagram.module.css";

interface DiagramProps {
    correctAnswers: number;
    incorrectAnswers: number;
    width?: number;
    height?: number;
    radius?: number;
}

const Diagram: React.FC<DiagramProps> = ({
    correctAnswers,
    incorrectAnswers,
    width = 300,
    height = 300,
    radius = 143,
}) => {
    const data = [
        { name: "Correct", value: correctAnswers },
        { name: "Incorrect", value: incorrectAnswers },
    ];

    const COLORS = ["#ff6b09", "#d7d7d7"];

    return (
        <div className={css.diagramContainer}>
            <PieChart width={width} height={height}>
                <Pie
                    data={data}
                    cx={width / 2}
                    cy={height / 2}
                    labelLine={false}
                    outerRadius={radius}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((_, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
            </PieChart>
        </div>
    );
};

export default Diagram;
