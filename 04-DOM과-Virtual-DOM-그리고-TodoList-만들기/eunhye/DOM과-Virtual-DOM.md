## DOM과 Virtual DOM

### DOM이란

HTML 문서를 브라우저에 렌더링하려면 브라우저가 이해할 수 있는 구조로 바꿔줘야한다. 이때 노드 트리로 형식으로 표현되는데 이것을 Document Object Model(DOM)이라고 한다. 

아래 이미지는 브라우저가 작동할 때 어떻게 DOM으로 바뀌고 렌더링 되는 과정을 나타낸 것이다. 즉, DOM은 자바스크립트로 HTML을 조작할 수 있도록, 자바스크립트가 이해할 수 있는 객체로 변환하는 것이다.

![](https://velog.velcdn.com/images/dmsgp220/post/82c156cc-00b2-4a15-924c-5991c35c38e2/image.png)<br>이미지 출처 :  https://web.dev/articles/howbrowserswork?hl=ko
<br>

Element를 수정,추가,생성하면 다시 렌더링 되는 과정이 일어난다. DOM이 수정되면 Render Tree가 생성되고, Layout, Paint 과정이 다시 일어난다.
하나의 컴포넌트만 변경되더라도 전체 페이지가 갱신되는 일이 생긴다. 이런 문제를 해결하기 위해서 Virtudal DOM이 탄생했다.


### Virtual DOM이란
사소한 변화에도 Render Tree가 생성되고 다시 렌더링 되는 번거로움을 해결하기 위해서 Virtual DOM을 도입했다. 로컬에 Virtual DOM을 생성하고, 변경을 감지한다. 첫번째 Virtual DOM과 업데이트 이후에 Virtual DOM을 비교해서 어떤 Element가 변했는지를 비교한다. (리액트에서 이 과정을 Diffing이라고 한다.)그 이후 실제 변경된 부분은 실제 DOM에 적용하게 된다. 이 과정을 Reconciliation이라고 한다.)
수정사항이 여러개더라도 변경된 내용을 하나로 묶어서 DOM에 딱 한번 적용시킨다. 만약 리스트 안에 있는 항목이 10개가 변경될때, 실제 DOM을 10번 반복해서 수정하는 것이 아니라, 이것을 하나로 묶어서 한번만 적용하는 것이다. 

Virtual Dom은 자바스크립트 객체이고 DOM의 가벼운 복사본이다. 실제 DOM object와 같은 속성들은 가지고있지만 api들은 가지고 있지 않다.

아래 이미지를 보면 변경된 빨간 동그라미들만 실제 DOM에서 변경되는 것을 알 수 있다.

![](https://velog.velcdn.com/images/dmsgp220/post/cea46bc3-d0af-4b20-a2cb-e9ec1a0483c9/image.png) 이미지 출처 : https://coding-medic.com/2020/11/10/the-virtual-dom/

<br>

#### DOM
DOM도 변경된 부분만 렌더링하는 최적화방식을 적용하려고 노력한다고 한다. DOM은 노드의 변경이 있을때 해당 노드 포함한 자식 부분이 다시 그려지게 된다. 
DOM은 변경 사항이 발생할 때 일괄 처리를 하지 않고, 변경이 발생하는 즉시 해당 DOM 조작을 즉시 적용한다.

#### Virtual DOM
Virtual DOM은 변경된 노드만을 감지하여 DOM에 적용한다. 
Virtual DOM은 변경 전 상태와 변경 후 상태 비교를 해서 최종적으로 변경된 부분만 실제 DOM 트리에 반영한다. 
그렇기 때문에 DOM을 직접 조작하는 것보다 효율적이라고 볼수 있다.

-----
참고<br>
https://ryublock.tistory.com/41<br>
https://www.howdy-mj.me/dom/what-is-dom<br>
https://callmedevmomo.medium.com/virtual-dom-react-%ED%95%B5%EC%8B%AC%EC%A0%95%EB%A6%AC-bfbfcecc4fbb<br>
https://www.youtube.com/watch?v=PN_WmsgbQCo<br>
https://yung-developer.tistory.com/75<br>
https://yoosioff.oopy.io/9adc2860-36e6-4cdd-97e0-1c0bd0b6a575
