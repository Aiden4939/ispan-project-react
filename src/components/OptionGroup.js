import React, { useEffect, useState } from "react";

function OptionGroup({ ot, data }) {
  const [checkState, setCheckState] = useState([]);
  const [nowNum, setNowNum] = useState(0);

  useEffect(() => {
    const newCheckState = data.options
      .filter((opt) => {
        return opt.options_type_sid === ot.sid;
      })
      .map((opt) => {
        return false;
      });
    setCheckState(newCheckState);
  }, []);
  const min = ot.min;
  const max = ot.max;
  return (
    <>
      {data.options
        .filter((opt) => {
          return opt.options_type_sid === ot.sid;
        })
        .map((opt, i) => {
          return (
            <>
              <label>
                {min === 1 ? (
                  <input type="radio" name="option" />
                ) : (
                  <input
                    type="checkbox"
                    name="option"
                    checked={checkState[i]}
                    onChange={() => {
                      const newCheckState = [...checkState];
                      if (!newCheckState[i]) {
                        newCheckState[i] = true;
                        setNowNum(nowNum + 1);
                      } else {
                        newCheckState[i] = false;
                        setNowNum(nowNum - 1);
                      }
                      setCheckState(newCheckState);
                    }}
                    disabled={
                      min > 1 && !checkState[i] && nowNum === min ? true : false
                    }
                  />
                )}
                {opt.name}
              </label>
            </>
          );
        })}
    </>
  );
}

export default OptionGroup;
