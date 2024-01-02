// import React from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  '먼저 회원 가입을 해 주세요!',
  '2024년 꼭 지키고 싶은 결심을 등록해 주세요!',
  `D-day 까지 매일 꾸준히 결심을 지키고 있는지 체크하면서 달성도를 채워나가세요!`,
  '다른 사람들은 어떤 결심을 했는지 확인해 보세요!',
];

const NotLoggedInGoalList = () => {
  return (
    // <>
    //   <section className='flex p-8 justify-center gap-5'>
    //     <div className={`${boxStyle} w-[300px] h-[300px] border rounded-xl`}>
    //       1.회원가입
    //     </div>
    //     {/* <div className='flex justify-center w-[300px] h-[300px] border rounded-xl'>
    //       1.회원가입
    //     </div> */}
    //     <div className='flex justify-center w-[300px] h-[300px] border rounded-xl'>
    //       2.목표 등록
    //     </div>
    //     <div className='flex justify-center w-[300px] h-[300px] border rounded-xl'>
    //       3.진행도 체크
    //     </div>
    //   </section>
    // </>
    <section className='flex flex-col items-center'>
      <p className='text-3xl mt-20 mb-10 ml-10'>이용 안내</p>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={-1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                // className='text-right'
                style={{ color: 'white' }}
                sx={{
                  // width: '200px',
                  // bgcolor: 'secondary.main',
                  // color: 'common.white',
                  '.MuiStepLabel-label': {
                    color: 'common.white',
                    fontSize: '20px',
                    textAlign: 'left',
                    // width: '150px',
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </section>
  );
};

export default NotLoggedInGoalList;
