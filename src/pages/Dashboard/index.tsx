import styled, { css } from 'styled-components';
import { Line } from 'react-chartjs-2';
import Container from '../../components/Container';
import DropdownSmall from '../../components/DropdownSmall';
import { flexBox } from '../../styles/mixin';
import { graphOptions, periodOptions } from '../../utils/conts';
import PerformanceSummary from './PerformaceSummary';
import useChart from '../../hooks/useChart';
import { useTrend } from '../../context/TrendContext';
import { DropdownOption } from '../../types';
import DropdownDouble from '../../components/DropdownDouble';

function Dashboard() {
  const { data } = useChart();
  const trends = useTrend();

  const handleOption1Click = (option: DropdownOption) => {
    trends?.setGraphOption(([opt1, opt2]) => (option.id === opt2.id ? [opt1, opt2] : [option, opt2]));
  };

  const handleOption2Click = (option: DropdownOption) => {
    trends?.setGraphOption(([opt1, opt2]) => (option.id === opt1.id ? [opt1, opt2] : [opt1, option]));
  };

  return (
    <>
      <SubTitle>통합 광고 현황</SubTitle>
      <Container>
        <PerformanceSummary />
        <Dropdowns>
          <DropdownDouble options={graphOptions} onOpt1Click={handleOption1Click} onOpt2Click={handleOption2Click} />

          <DropdownSmall options={periodOptions} customStyle={DropdownStyle2} initialOption={periodOptions[0]} />
        </Dropdowns>

        <ChartContainer>
          <Line data={data} />
        </ChartContainer>
      </Container>
    </>
  );
}

export default Dashboard;

const SubTitle = styled.div`
  margin-top: 20px;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.grey_800};
`;

const Dropdowns = styled.div`
  margin-top: 42px;
  ${flexBox('row', 'space-between')}
`;

const DropdownStyle = css`
  margin-right: 10px;
`;

const DropdownStyle2 = css`
  border: none;
`;

const ChartContainer = styled.div`
  margin-top: 40px;
  padding: 20px;
`;
