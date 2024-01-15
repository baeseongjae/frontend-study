1.  Vitual DOM에 대한 설명으로 옳지 **않은** 것은?

    > a. 모든 DOM을 렌더링 하지 않고 최종적인 변화를 하나로 묶어서 실제 DOM에 적용한다.  
    > b. Vitual DOM을 통해 레이아웃 계산과 리레더링의 규모도 줄어든다.  
    > c. Vitual DOM을 통해 DOM의 변화를 쉽게 핸들링 할 수 있고, 연산 횟수를 줄일 수 있다.

    <details>
      <summary>정답</summary>
      <div markdown="1">
    2 : 한번에 적용하기 때문에 오히려 규모는 커진다.
       </details>

<br />

2.  렌더링 횟수를 줄이는 건, Virtual DOM 없이도 가능하다. (⭕️/❌)
       <details>
         <summary>정답</summary>
         <div markdown="2">
    ⭕️

    - 최종적인 변화를 하나로 묶어 DOM fragment에 적용한 다음 기존 DOM에 반영하면 Virtual DOM 없이도 렌더링 획수를 줄이는게 가능하다.

    - 하지만 DOM fragment를 지속적으로 관리해야 하는 등 생산성이 많이 떨어진다.

      </div>

    </details>
