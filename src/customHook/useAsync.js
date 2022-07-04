import { useReducer, useEffect, useCallback } from "react";

// 로딩중인지 에러 발생했는지 상태를 체크하기 위해 리듀서 지정

// 초기값
const initialState = {
    loading : false,
    data : null,
    error : null,
}

// 리듀서 함수, 로딩중, 데이터 받기 성공, 데이터 받기 실패
// LOADING, SUCCESS, ERROR 3개의 타입 지정
function reducer(state, action){
    switch(action.type){
        case "LOADING":
            return {
                loading : true,
                data : null,
                error : null,
            }
        case "SUCCESS":
            return {
                loading : false,
                data : action.data,
                error : null,
            }
        case "ERROR":
            return {
                loading : false,
                data : null,
                error : action.error,
            }
        default :
            return state;
    }
}


function useAsync(callback, deps=[]){
    const [state, dispatch] = useReducer(reducer, initialState);
    const fetchDate = async () => {
        dispatch({type : "LOADING"});
        try {
            const data = await callback();      // callback 함수(axios)가 실행이 완료되면 data에 값을 담고 
            dispatch({                          // dispatch를 진행한다
                type : "SUCCESS",
                data : data,
            })
        }
        catch(e){
            dispatch({
                type: "ERROR",
                error : e,
            });
        }
    }    
    useEffect(()=>{             // 페이지가 처음 렌더링됐을 때
        fetchDate();            // 함수 실행
    },deps);
    return [state, fetchDate]
}

export default useAsync;