import React, {useState} from 'react';
import { Form, Field } from 'react-final-form';
import {Button, Typography, Box, Checkbox} from "@mui/material";
import nIcon from '../images/nastya.png';
import aIcon from '../images/arab.png';

const Game = () => {
  const [gameStatus, setGameStatus] = useState(false);
  const [gameStage, setGameStage] = useState(0);
  const gameStages = [
    {
      id: 1,
      que: 'Каковы должны быть знания для прохождения игры?',
      variants: [
        {id: 1, name: 'Фундаментальные'},
        {id: 2, name: 'Дистанционарные'},
      ],
      value: [1, 2]
    },
    {
      id: 2,
      que: 'Кто по жизни Артур Х?',
      variants: [
        {id: 1, name: 'Червяк вонючий'},
        {id: 2, name: 'Подногтевая грязь'},
        {id: 3, name: 'Женская жижа'},
        {id: 4, name: 'Ефрейтор'},
        {id: 5, name: 'Девка'},
        {id: 6, name: 'Юрист'},
      ],
      value: [1, 2, 3, 4, 5]
    },
    {
      id: 3,
      que: 'Лучшее место, чтобы оттянуться?',
      variants: [
        {id: 1, name: 'Огонек'},
        {id: 2, name: 'Кафе на клумбе'},
        {id: 3, name: 'Большая рыба'},
        {id: 4, name: 'Пиноккио Джан'},
      ],
      value: [3]
    },
    {
      id: 4,
      que: 'Сколько арабов было у Насти?',
      variants: [
        {id: 1, name: 'Более 100'},
        {id: 2, name: 'Более 50'},
        {id: 3, name: 'Более 20'},
        {id: 4, name: 'Более 10'},
      ],
      value: [1]
    },
    {
      id: 5,
      que: 'Насколько вероятно попасть в рабство в Турции?',
      variants: [
        {id: 1, name: '100%'},
        {id: 2, name: '50%'},
        {id: 3, name: '0%'},
      ],
      value: [1]
    },
  ]
  const handleSubmit = async (values) => {
    if (gameStage < gameStages.length) {
      setGameStage(prev => prev + 1);
    } else {
      setGameStage(prev => prev + 1);
      console.log(values);
    }
  }

  const sort = (a, b) => a - b;

  const answer = gameStages.find(item => item.id === gameStage);

  const validate = (value) => {
    if (!value || !Array.isArray(value)) return 'Неправильно';
    if (value.length !== answer.value.length) return 'Неправильно';
    let cond = true;
    for (let i = 0; i < answer.value.length; i++) {
      cond = answer.value[i] === value[i];
    }
    if (!cond) return 'Неправильно';
  }

  return (
    <div className={'game'}>
      <Typography variant={'h2'}>Помоги Насте сблизиться с арабом</Typography>
      <hr className={'game-line'}/>
      <Typography className={'game-text'} p={true}>
        Отвечай на вопросы, чтобы сблизить Настю с арабом и получить подарок. Если не ответишь на вопрос - нихера не получишь.
        Может быть как несколько правильных вариантов, так и ни одного.
      </Typography>
      <div className={'game-wrapper'}>
        <img style={{
          left: gameStage ? gameStage * 13.5 - 20 + '%' : 0,
        }} className={'game-img game-img_nastya'} src={nIcon} alt=""/>
        <img className={'game-img game-img_arab'} src={aIcon} alt=""/>
      </div>
      <Box className={'game-zone'}>
        {!gameStatus
          ? <Button onClick={() => {
            setGameStage(1);
            setGameStatus(true);
          }} variant={'contained'}>Начать игру</Button>
          : gameStage > gameStages.length
            ? (
              <div>
                <Typography variant={'h4'}>Поздравляем! Ты помогла Насте сблизиться с арабом</Typography>
                <Typography className={'game-text'} p={true}>
                  Ты ответила правильно на все вопросы и можешь получить заслуженный подарок от меня и героя вопроса №2 (грязь)
                </Typography>
                <Typography style={{fontWeight: 600}} className={'game-text'} p={true}>
                  В общем там подарочный сертификат, но покупали мы в последний момент, поэтому он еще не пришел, Артур сам нихера не мог без меня
                </Typography>
              </div>
            )
            : (
              <Form onSubmit={handleSubmit} >
                {
                  ({ values, handleSubmit }) => {
                    return (
                      <form onSubmit={handleSubmit}>
                        <div><Typography variant={'h4'}>{answer.que}</Typography></div>
                        <Field name={'answer' + answer.id} validate={validate}>
                          {({input, meta}) => {
                            return (
                              <div className={'game-variants'}>
                                {answer.variants.map(item => (
                                  <div key={item.id} className="game-variant">
                                    <Checkbox onBlur={input.onBlur} onFocus={input.onFocus} onClick={() => {
                                      if (input.value.includes(item.id)) {
                                        const newVal = input.value.filter(elem => elem !== item.id).sort(sort);
                                        input.onChange(newVal);
                                      } else {
                                        const newVal = [...input.value, item.id].sort(sort);
                                        input.onChange(newVal);
                                      }
                                    }} checked={input.value.includes(item.id)}></Checkbox>
                                    {item.name}
                                  </div>
                                ))}
                                {meta.touched && meta.error && <div><p className={'game-error'}>{meta.error}</p></div>}
                              </div>
                            );
                          }}
                        </Field>
                        <div>
                          <Button type={'submit'} variant={'contained'}>Ответить</Button>
                        </div>
                      </form>
                    );
                  }
                }
              </Form>
          )}
      </Box>
    </div>
  );
};

export default Game;