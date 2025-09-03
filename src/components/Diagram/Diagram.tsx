import { PieChart, Pie, Cell } from "recharts";
import css from "./Diagram.module.css";

interface DiagramProps {
    correctAnswers: number;
    incorrectAnswers: number;
}

const Diagram: React.FC<DiagramProps> = ({
    correctAnswers,
    incorrectAnswers,
}) => {
    const data = [
        { name: "Correct", value: correctAnswers },
        { name: "Incorrect", value: incorrectAnswers },
    ];

    const COLORS = ["#ff6b09", "#d7d7d7"];

    return (
        <div className={css.diagramContainer}>
            <PieChart width={300} height={300}>
                <Pie
                    data={data}
                    cx={143}
                    cy={143}
                    labelLine={false}
                    outerRadius={143}
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
