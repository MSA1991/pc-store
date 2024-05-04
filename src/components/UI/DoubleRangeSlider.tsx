import { memo, useEffect, useState } from 'react';
import Slider from 'react-slider';

type Props = {
  presetMinValue: number;
  presetMaxValue: number;
  minValue: number;
  maxValue: number;
  onChangeMinValue: (value: number) => void;
  onChangeMaxValue: (value: number) => void;
};

const MIN_DISTANCE = 10;

export const DoubleRangeSlider = memo(
  ({
    presetMaxValue,
    presetMinValue,
    minValue,
    maxValue,
    onChangeMinValue,
    onChangeMaxValue,
  }: Props) => {
    const initialMinValue = presetMinValue || minValue;
    const initialMaxValue = presetMaxValue || maxValue;

    const [values, setValues] = useState([initialMinValue, initialMaxValue]);
    const [currentMinValue, currentMaxValue] = values;

    const maxValueForMinInput = currentMaxValue - MIN_DISTANCE;
    const minValueForMaxInput = currentMinValue + MIN_DISTANCE;

    useEffect(() => {
      setValues([initialMinValue, initialMaxValue]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minValue, maxValue]);

    const setValuesInFilter = (min: number, max: number) => {
      onChangeMinValue(min);
      onChangeMaxValue(max);
    };

    const handleChangeCurrentValue = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const { value, name } = e.target;
      const parsedValue = +value;

      if (name === 'min') {
        setValues([parsedValue, currentMaxValue]);
      } else {
        setValues([currentMinValue, parsedValue]);
      }
    };

    const handleSetValidValues = () => {
      const newMinValue = Math.max(
        minValue,
        Math.min(currentMinValue, maxValueForMinInput)
      );
      const newMaxValue = Math.min(
        maxValue,
        Math.max(currentMaxValue, minValueForMaxInput)
      );

      setValues([newMinValue, newMaxValue]);
      setValuesInFilter(newMinValue, newMaxValue);
    };

    return (
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <div className="flex gap-1 w-10 grow dark-item p-1">
            <input
              type="number"
              name="min"
              className="w-full bg-black outline-none"
              value={String(currentMinValue)}
              min={minValue}
              max={maxValueForMinInput}
              onChange={handleChangeCurrentValue}
              onBlur={handleSetValidValues}
            />

            <span className="text-light-gray">$</span>
          </div>

          <span>-</span>

          <div className="flex gap-1 w-10 grow dark-item p-1">
            <input
              type="number"
              name="max"
              className="w-full bg-black outline-none"
              value={String(currentMaxValue)}
              min={minValueForMaxInput}
              max={maxValue}
              onChange={handleChangeCurrentValue}
              onBlur={handleSetValidValues}
            />

            <span className="text-light-gray">$</span>
          </div>
        </div>

        <Slider
          className="w-full h-2 my-1 bg-black rounded [&_>_.track-1]:bg-white [&_>_.track-1]:h-2 [&_>_.track-1]:rounded"
          thumbClassName="bg-blue w-4 h-4 rounded-full -top-1 cursor-grab outline-none transition-colors hover:bg-cayn"
          value={values}
          onChange={setValues}
          min={minValue}
          max={maxValue}
          pearling
          minDistance={MIN_DISTANCE}
          onAfterChange={() =>
            setValuesInFilter(currentMinValue, currentMaxValue)
          }
        />
      </div>
    );
  }
);
