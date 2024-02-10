import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box } from '@mui/system';
import { MAIN_COLOR } from '../consts';

interface ChartProps {
    soundLevels: number[];
}

export default function Chart({ soundLevels }: ChartProps) {
    return (
        <Box height={300}>
            <LineChart
                series={[{ data: soundLevels, color: MAIN_COLOR }]}
                height={300}
            />
            <BarChart
                skipAnimation
                series={[{ data: soundLevels, color: MAIN_COLOR }]}
                height={300}
            />
        </Box>
    )
}