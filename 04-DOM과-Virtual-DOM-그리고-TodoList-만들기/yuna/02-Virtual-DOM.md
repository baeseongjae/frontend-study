# Virtual DOM

## 탄생 배경

DOM에 변경이 있을 경우 (스크립트를 통한 레이아웃 변화 또는 화면의 resize 등) 렌더트리를 재생성하고 (모든 요소들의 스타일이 다시 계산됨) 레이아웃을 만들고 페인팅을 하는 과정이 다시 반복되는데, DOM 변경이 일어나는 요소가 많은 자식 요소를 가지고 있는 경우에도 하위 자식 요소도 덩달아 변경돼야 하기 때문에 더 많은 비용을 브라우저와 사용자가 지불하게 됨

즉, 브라우저가 연산을 많이 해야한다는 이야기이며, 전체적인 프로세스를 비효율적으로 만든다는 것

→ 이러한 작업은 하나의 페이지에서 모든 작업이 일어나는 **SPA(Single Page Application)**에서 더욱 많아짐

페이지가 변경되는 경우 다른 페이지로 가서 처음부터 HTML을 새로 받아 다시 렌더링 과정을 시작하는 일반적인 웹 페이지와는 다르게, **하나의 페이지에서 계속해서 요소의 위치를 재계산**하게 됨

라우팅이 변경되는 경우 특정 요소를 제외하고 대부분 요소를 삭제하고, 다시 삽입하고, 위치를 계산하는 등의 작업을 수행해야 하므로 특히 이러한 과정이 두드러짐

→ SPA 특징 덕분에 사용자는 페이지 깜빡임 없이 자연스러운 웹페이지 탐색이 가능하지만, 그만큼 DOM을 관리하는 과정에서 부담해야 할 비용이 커진 것



그래서 **가상 DOM** 등장!

기존 DOM 조작의 실제 문제는 각 조작이 레이아웃 변화, 트리 변화와 렌더링을 일으킨다는 것 - 30개 노드를 하나 하나 수정하면, 30번의 (잠재적인) 레이아웃 재계산과 30번의 (잠재적인) 리렌더링을 초래할 수도 있음

→ Virtual DOM은 30번의 변화가 있다고 해서 30번 수정이 발생하지 않고 모든 연산이 끝나면 그 최종적인 변화를 DOM에 반영함

모든 변화를 하나로 묶어서 단 한번만 적용하기 때문에  레이아웃 계산과 리렌더링의 규모는 커지겠지만, 연산의 횟수를 줄여서 성능을 개선하는 것이 Virtual DOM

특히, DOM 관리를 Virtual DOM 이 하도록 함으로써, 컴포넌트가 DOM 조작 요청을 할 때 다른 컴포넌트들과 상호작용을 하지 않아도 되고, 특정 DOM 을 조작할 것 이라던지, 이미 조작했다던지에 대한 정보를 공유 할 필요가 없음

즉, 각 변화들의 동기화 작업을 거치지 않으면서도 모든 작업을 하나로 묶어줄 수 있다는 것

위와 같은 상황에서 Virtual DOM 이 빛을 발합니다! 

만약에 View에 변화가 있다면, 그 변화는 실제 DOM 에 적용되기전에 가상의 DOM 에 먼저 적용시키고 그 최종적인 결과를 실제 DOM 으로 전달해줍니다. 이로써, 브라우저 내에서 발생하는 연산의 양을 줄이면서 성능이 개선되는 것!

다시 정리하면 DOM의 상태를 메모리에 저장하고, 변경 전과 변경 후의 상태를 비교한 뒤 최소한의 내용만 반영 하기 때문에 브라우저의 기본 동작처럼 계속해서 Reflow와 Repainting 이 발생하지 않아도 되며 이는 성능의 향상으로 이어지게 됨

&nbsp;

## Virtual DOM 기본 원리

1. real dom으로부터 virtual dom을 만듦 (virtual dom은 메모리 상에 존재하는 하나의 객체)

2. 변화가 생기면 새로운 버전의 virtual dom을 만듦
3. old 버전의 virtual dom과 new 버전의 virtual dom을 비교 (diff algorithm)
4. 비교 과정을 통해서 발견한 차이점을 real dom에 적용

이 과정을 **reconciliation(재조정)**이라고 함 (리액트에서 어떤 부분을 새롭게 렌더링해야 하는지 가상 DOM과 실제 DOM을 비교하는 작업 (알고리즘))

![](https://velog.velcdn.com/images/kukoo/post/7756cc12-5a04-4956-a95e-1b475b3b07d5/image.png)


→ 이렇게 DOM 계산을 브라우저가 아닌 메모리에서 계산하는 과정을 한 번 거치게 되면 여러 번 발생했을 렌더링 과정(브라우저 내에서 발생하는 연산의 양)을 최소화하며 성능이 개선되는 것

여기서, virtual dom도 reconciliation(재조정)이 끝난 마지막 단계에서는 real dom api를 사용

&nbsp;

### Virtual DOM의 오해 → 리액트의 방식이 일반적인 DOM을 관리하는 브라우저보다 빠르다?!

→ 리액트 개발자 댄 아브라모프가 사실이 아니라고 부정한 바 있음
> 무조건 빠른 것이 아니라 리액트의 가상 DOM 방식은 대부분 상황에서 웬만한 애플리케이션을 만들 수 있을 정도로 충분히 빠르다는 것
> ('diffing + Real DOM' 이 Real DOM 보다 빠를 수는 없음)
> https://svelte.dev/blog/virtual-dom-is-pure-overhead


사실상, 변화시키고 싶은 부분을 찾아 변화시키면 DOM api를 사용하는 것과는 별다른 차이점이 없는 것 아닐까?

**💡 변경을 감지하는 방법 (변화된 특정 node 감지)**

1. dirty checking
dirty checking은 node tree를 재귀적으로 계속 순회하면서 어떤 노드에 변화가 생겼는지를 인식하고, 그 노드만 리렌더링을 시켜주면 되는 방식 (angular.js가 사용하던 방법)
→ 변화가 없을 때도 재귀적으로 노드를 탐색함으로써 불필요한 비용이 발생하고 성능적인 측면에서도 문제가 있음

2. observable
변화가 생긴 노드가 관찰자에게 알림을 보내주는 방식
→ 이런 방식을 사용할 경우에 변화가 생기기 전까지는 아무일도 하지 않다가, 노드에게 변화가 생겼다는 알림을 받으면 렌더링하면 되는 효율적인 방식

**💡 그럼에도 불구하고, observable의 문제점**

변화에 대한 알림을 받으면 전체를 렌더링 시켜버림
→ 전체를 렌더링시키는 것은 말그대로 엄청난 reflow-repaint 비용을 발생시킴

**💡 virtual dom의 등장**
virtual dom은 메모리 상에 존재하는 하나의 객체

리액트는 특정 state에 변화가 생겼다는 알림을 받으면 real dom 전체를 렌더링 시켜주는 것이 아니라 **virtual dom을 렌더링 시키고, 거기서 변화가 생긴 내용을 비교해 마지막에 가서는 꼭 필요한 부분만 real dom에 적용시키는 방식**으로 효율성을 높인 것!

&nbsp;&nbsp;

# 가상 DOM을 위한 아키텍처, 리액트 파이버
> react v16.0에서 소개된 리액트의 new core algorithm, 가상 DOM과 렌더링 과정 최적화를 가능하게 해주는 것이 바로 **리액트 파이버(React Fiber)**

## React Fiber가 만들어진 배경

### React element

```jsx
import React from "react"
import ReactDOM from "react-dom"

const List = () => {
  return (
    <div>
      <h1>My favorite ice cream flavors</h1>
      <ul>
        <li className="brown">Chocolate</li>
        <li className="white">Vanilla</li>
        <li className="yellow">Banana</li>
      </ul>
    </div>
  )
}

ReactDOM.render(<List/>, document.getElementById("global"))
```

JSX는 자바스크립트 표준 코드가 아닌 페이스북이 임의로 만든 새로운 문법이기 때문에 JSX는 반드시 트랜스파일러를 거쳐야 비로소 자바스크립트 런타임이 이해할 수 있는 의미 있는 자바스크립트 코드로 변환됨

**babel 거친 후 코드** 
```js
import React from "react"
import ReactDOM from "react-dom"

const List = () => {
  return React.createElement("div",null,
          React.createElement("h1", null, "My favorite ice cream flavors"),
           React.createElement("ul",null,
            React.createElement("li",{ className: "brown",}, "Chocolate"),
            React.createElement("li",{className: "white",},"Vanilla"),
            React.createElement("li",{className: "yellow",},"Banana")
    )
  )
}

ReactDOM.render(React.createElement(List, null),document.getElementById("global"))
```

→ **createElement 메서드** 사용하고 있는 것을 알 수 있음

그렇다면, **React createElement 메서드**를 살펴보자!
> https://github.com/facebook/react/blob/main/packages/react/src/ReactElement.js

```js
export function createElement(type, config, children) {

 ...중략
 
 return ReactElement(
   type,
   key,
   ref,
   self,
   source,
   ReactCurrentOwner.current,
   props,
 );
}

const ReactElement = function(type, key, ref, self, source, owner, props) {
 const element = {
   // This tag allows us to uniquely identify this as a React Element
   $$typeof: REACT_ELEMENT_TYPE,

   // Built-in properties that belong on the element
   type: type,
   key: key,
   ref: ref,
   props: props,

   // Record the component responsible for creating this element.
   _owner: owner,
 };


 return element;
};

```
→ ReactElement 함수의 내부를 보니 **element라는 객체**를 만들어 반환하고 있음 (**단순한 객체**)

이 때, element는 실제 DOM 노드 또는 컴포넌트 인스턴스가 아니고, 어떤 종류의 element이고 어떤 속성을 가지고 있으며 어떤 children을 가지고 있는지 나타내는 React에게 알려주는 방식

즉, 화면에 렌더링해야 하는 내용에 대한 설명일 뿐이며 실제로 만들고 인스턴스화 할 때 렌더링이 발생하지 않기 때문에, React가 DOM 트리를 구축하기 위해 파싱하고 순회하는 것이 더욱 편리해짐 (실제 렌더링은 이런 순회가 전부 끝난 후에 발생함)

→ React는 앱의 컴포넌트 트리를 재귀적으로 순회하면서 기본적인 DOM tag element를 알아내고, 이 과정이 끝날 때쯤 React는 DOM 트리의 결과를 알 수 있고 react-dom이나 react-native와 같은 렌더러에게 DOM 노드를 변경해야할 최소한의 변화를 적용하는 것 (과거 old reconciliation = stack reconciliation)

&nbsp;&nbsp;


### old reconciliation의 한계

**과정 요약**
real dom tree를 copy한 virtual tree가 만들어짐 → 변경사항이 생기면 new virtual tree가 만들어짐 → old virtual tree와 new virtual tree 비교

**💡 여기서 비교에 문제가 있음**

두 virtual tree는 객체로 만들어져있고, 이 두 virtual tree 상에서 차이점이 있는 것을 찾아내기 위해서 diff 알고리즘이 진행되는데, 두 객체를 비교하기 위해선 재귀적으로 진행됨

재귀 알고리즘은 본질적으로 **call stack**과 연관이 있음 → 그래서 stack reconciliation

> **재귀 알고리즘의 기본적인 작동 방식**
> 가장 상단에 있는 함수가 호출되면 해당 함수는 call stack 가장 아래에 쌓이게 되고, 내부적으로 함수가 호출될 때마다 반복적으로 call stack에 차근 차근 쌓여가고 함수가 반환되면 그때서야 함수는 call stack에서 pop됨

---

#### JavaScript call stack (호출 스택)
> 스택은 LIFO(Last in, First out) 자료 구조로 코드가 실행하면서 만드는 실행 컨텍스트들이 저장되는 구조

자바스크립트 엔진이 script tag를 처음 만나면 전역 컨텍스트를 만들고 현재 실행되고 있는 호출 스택에 이를 push하고 하고, 다른 함수가 호출 되면 해당 함수에 대한 실행 컨텍스트를 생성하고 스택의 제일 꼭대기에 push 

이 때, 자바스크립트 엔진은 실행 컨텍스트가 호출 스택에서 가장 위에 있는 함수를 실행하고 함수가 할 일을 마치면 스택에서 제거됨 (pop)

(여기서, 실행 컨텍스트는 쉽게 말해 코드가 실행되고 있는 구역, 범위에 대한 개념)

&nbsp;

**이  때, 이때 브라우저가 HTTP request와 같은 비동기 이벤트를 만들면 어떻게 될까?**

JS엔진은 호출 스택 말고도 이벤트 큐(태스크 큐, 콜백 큐)라고 하는 큐 데이터 구조가 있는데, 이벤트 큐는 브라우저로 들어오는 HTTP 또는 네트워크 이벤트와 같은 비동기 호출을 처리함

이 때, JS엔진이 호출 스택이 비어있으면 큐의 작업을 처리하게 되는데 JS엔진은 실행 스택이 비어있거나 실행 스택에 global execution context만 있을 때 이벤트 큐를 확인한다는 점에 유의!

비동기 이벤트라고 부르지만 이벤트가 대기열에 도착하는 시점은 비동기이지만 실제로 처리되는 시점에서는 비동기적이진 않음

---

다시 stack reconciler로 돌아와서, React가 트리를 순회할 때마다 호출 스택은 이렇게 동작하기 때문에, 업데이트가 도착하면 이벤트 대기열로 추가되고, 그리고 실행 스택이 비워질때만 업데이트가 처리됨

즉, call stack이 비어있는 여부를 확인한 후에야 콜백 함수들을 call stack에 올려 놓고 실행하기 때문에 call stack이 비어있지 않다면 태스크 큐에 대기중인 함수들은 실행될 수 없을 것

그래서 어플이 방대해지면 비교 알고리즘이 장시간 진행되게 되고 중간에 유저 이벤트가 들어왔을 때 → 재귀 알고리즘은 아직 남았기 때문에 call stack 공간을 차지하고 있게 되어 즉각적으로 유저 이벤트에 대응할 수 없고 프레임 드롭 문제를 일으킴

> **프레임 드롭?**
> 한 프레임 안에서 작업을 수행하는데 걸리는 시간이 16ms가 넘어가면, smooth한 화면을 보여줄 수 없게되고, 이 현상을 프레임 드롭이라고 함 (1초 1000ms이고, 60프레임을 1000으로 나누면 1프레임 당 소요할 수 있는 시간 약 16ms)
> 즉, 뚝뚝 끊기는 현상

결론적으로, 재귀적으로 tree를 순회하는 시간이 16ms를 넘어서면, 프레임 드롭이 발생할 뿐더러, 어플의 크기에 따라 순회하는 시간이 길어지면 유저 이벤트에 즉각적으로 대응하는 하는 것이 어려워지는 것

기존 렌더링 스택의 비효율성을 타파하기 위해 스택 조정자 대신 **`파이버`**라는 개념 탄생!

&nbsp;

## React Fiber 등장

### react fiber의 목적
> 리액트 웹 애플리케이션에서 발생하는 애니메이션, 레이아웃, 사용자 인터랙션에 올바른 결과물을 만드는 반응성 문제를 해결하는 것

이 목적을 달성하기 위해 필요한 기능 (intelligent 기능)

- 작업을 작은 단위로 분할하고 쪼갠 다음, 우선 순위 지정
- 작업을 일시 중지하고 나중에 다시 시작
- 더 이상 필요하지 않은 경우 작업 중단
- 이전에 완료된 작업 재사용

→  react fiber는 리액트 렌더링 알고리즘에 스케줄링을 구현한 것 (**‼️ 이러한 모든 과정이 비동기로 일어남**)

&nbsp;

**fiber**
- 파이버는 리액트에서 관리하는 평범한 자바스크립트 객체
- 파이버는 파이버 재조정자(fiber reconciler)가 관리
	가상 DOM과 실제 DOM을 비교해 변경 사항을 수집하며, 이 둘 사이에 차이가 있으면 변경에 관련된 정보를 가지고 있는 파이버를 기준으로 화면에 렌더링을 요청하는 역할
  

&nbsp;

## Fiber는 어떻게 구현돼 있을까?
> 가상의 stack으로 구현되어 있음 (단일 연결 리스트를 활용)

- Fiber는 React 컴포넌트에 특화된 stack의 재구현이며, 단일 fiber를 가상의 stack 프레임으로 생각할 수 있음
- stack을 다시 구현할 때 장점은 stack 프레임을 메모리에 유지하고 언제든지 원하는대로 실행할 수 있다는 점 

이전 reconciliation 알고리즘에서 React는 불변한 React element를 재귀적으로 순회하는 트리를 만들었음

하지만, fiber의 구현으로 render 함수의 인자로 넘어온 element 객체는 그 안에 들어오면서 하나하나 fiber node로 변환되고, 그 node들은 모두 연결되어 React는 변경할 수 있는 fiber 노드 트리를 생성하게 됨
이 때, fiber 노드는 컴포넌트의 state, props 그리고 기본적인 나타낼 DOM 요소를 효율적으로 가지고 있고, 업데이트가 있다면 간단히 노드를 복사하고 업데이트할 수 있게 됨

결과적으로 React는 fiber 트리를 재귀적으로 순회하지 않는 대신 single linked list를 만들고 부모 우선 깊이 순회(parent-first, depth-first)를 진행함

### Singly linked list of fiber nodes
> https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiber.js#L135

```javascript
function FiberNode(tag, pendingProps, key, mode) {
    // Instance
    this.tag = tag;
    this.key = key;
    this.elementType = null;
    this.type = null;
    this.stateNode = null;

    // Fiber
    this.return = null;
    this.child = null;
    this.sibling = null;
    this.index = 0;

    this.ref = null;
    this.refCleanup = null;

    this.pendingProps = pendingProps;
    this.memoizedProps = null;
    this.updateQueue = null;
    this.memoizedState = null;
    this.dependencies = null;

    this.mode = mode;

    // Effects
    this.flags = NoFlags;
    this.subtreeFlags = NoFlags;
    this.deletions = null;

    this.lanes = NoLanes;
    this.childLanes = NoLanes;

    this.alternate = null;
    // 이하 프로파일러, __DEV__ 코드는 생략
}
```
→ 파이버도 결국 단순(?)한 자바스크립트 객체!

&nbsp;

💡 **파이버 노드의 주요 속성**

**Tag**
파이버는 하나의 element에 하나가 생성되는 1:1 관계를 가지고 있음 → 여기서 1:1로 매칭된 정보를 가지고 있는 것이 바로 tag
이 때, 1:1로 연결되는 것은 리액트 컴포넌트일 수도 HTML의 DOM 노드일 수도, 혹은 다른 어떤 것일 수도 있음 
(리액트에 작성돼 있는 파이버 태그가 가질 수 있는 값들 https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactWorkTags.js)

**Type**
`<div>` , `<span>` 등 host 컴포넌트(문자열) 이거나 합쳐진 컴포넌트인 클래스나 함수

**Key**
React에서 전달하는 key와 동일

**Child**
컴포넌트에서 render() 를 호출할 때 반환되는 요소
```jsx
const Name = (props) => {
    return (
        <div className="name">
            {props.name}
        </div>
    )
}
```
`<Name>` 은 `<div>` 를 반환하므로 여기서 child는 `<div>` 

**Sibling**
render가 반환하는 element 목록
```jsx
const Name = (props) => {
    return ([<Customdiv1 />, <Customdiv2 />])
}
```
위의 경우, `<Customdiv1>` 과 `<Customdiv2>` 는 부모인  `<Name>` 의 자식 요소입니다. 두 자식 요소는 단순 연결 리스트로 이루어져 있음

**Return**
논리적으로 부모 fiber 노드인 스택 프레임에 반환을 의미, 즉 부모 요소를 나타냄

> 즉, `child`, `sibling`, `return`은 파이버 간의 관계 개념을 나타내는 속성
> → 리액트 컴포넌트 트리가 형성되는 것과 동일하게 파이버도 트리 형식을 갖게 되는데, 이 트리 형식을 구성하는 데 필요한 정보가 이 속성 내부에 정의되는 것

**Index**
여러 형제 (sibling) 사이에서 자신의 위치가 몇 번째인지 숫자로 표현함

---

```jsx
<ul>
	<li>하나</li>
	<li>둘</li>
	<li>셋</li>
</ul>
```

**파이버 노드 표현**
```js
// `return`은 부모 파이버를 의미 (모든 `<li />` 파이버는 `<ul />` 파이버를 `return`으로 갖게 될 것)
const l3 = {
	return: ul, 
	index: 2,
}
// 나머지 두 개의 `<li />` 파이버는 형제 (sibling)으로 구성됨
const l2 = {
	sibling: l3,
	return: ul,
	index: 1
}
const l1 = {
	sibling: l2,
	return: ul,
	index: 0,
}
const ul = {
	// ...
  	// 파이버의 자식은 항상 첫 번째 자식 참조로 구성되므로 `<ul />` 파이버의 자식은 첫 번째 `<li />` 파이버가 됨
	child: li,
}
```

----

**stateNode**
파이버 자체에 대한 참조 (reference) 정보를 가지고 있으며, 이 참조를 바탕으로 리액트는 파이버와 관련된 상태에 접근함

**pendingProps and memoizedProps**
메모화(Memoization)는 중복 계산을 피하기 위해 함수의 실행 결과를 저장하는데, pendingProps는 컴포넌트로 전달된 props이고, memoizedProps는 노드의 props를 저장하고 실행 스택의 끝에서 초기화됨

이 때, 전달받은 pendingProps와 memoizedProps가 같으면 fiber의 이전 결과를 재사용할 수 있다는 신호를 보내 불필요한 작업을 방지함


**pendingWorkPriority**
fiber에서 숫자로 작업의 우선 순위를 나타내는데, ReactPriorityLevel 모듈은 다양한 우선 순위 레벨과 해당 숫자를 나열함 (값이 0인 NoWork 을 제외하고, 숫자가 클수록 우선 순위가 낮음)

스케줄러는 우선 순위 필드를 사용해 다음에 수행할 작업을 검색함

**UpdateQueue**
상태 업데이트, 콜백 함수, DOM 업데이트 등 필요한 작업을 담아두는 큐
💡 큐의 구조
```js
		type updateQueue = {
			  first: Update | null,
			  last: Update | null,
			  hasForceUpdate: boolean,
			  callbackList: null | Array<Callback>, // setState로 넘긴 콜백 목록
		}
```

**MemorizedState**
함수형 컴포넌트의 훅 목록이 저장됨 (useState 뿐만 아니라 모든 훅 리스트가 저장됨)

**Alternate**
컴포넌트 인스턴스는 최대 두 개의 fiber를 가질 수 있음 : 현재 fiber(이미 렌더링 된 것) 와 진행중인 fiber(개념적으로 아직 반환되지 않은 스택 프레임) > 현재 fiber와 진행중인 fiber는 서로 대체될 수 있음

**Output**
React 애플리케이션의 leaf 노드를 말하며, 렌더링 환경에 따라 노드는 달라질 수 있음

---

더 자세히 살펴보자!

Fiber 노드들은 3가지 필드를 가지고 인자로 받아 온 노드들을 모두 단일 연결 리스트로 연결 시켜주는 함수가 있음

```javascript
function link(parent, elements) {
  if (elements == null) elements = []

  parent.child = element.reduceRight((prev, cur) => {
    const node = new Node(cur)
    node.return = parent
    node.sibling = prev
    return node
  }, null)
  return parent.child
}
```

그리고 이 link 함수는 parent 노드의 가장 첫번째 자식을 반환함

```javascript
const children = [{ name: "b1" }, { name: "b2" }]
const parent = new Node({ name: "a1" })
const child = link(parent, children)

child.instance.name === "b1" //true
child.sibling.instance === children[1] // true
```

또한, 현재 노드와 자식 노드들의 연결을 도와주는 helper 함수가 있음

```javascript
function doWork(node) {
  console.log(node.instance.name)
  const children = node.instance.render()
  return link(node, children)
}
```

그리고 이렇게 연결된 함수들을 탐색하는 walk 함수가 있으며, 이 탐색은 기본적으로 깊이 우선 탐색으로 이루어짐

```javascript
function walk(o) {
  let root = o
  let current = o
  while (true) {
    let child = doWork(current)
    //자식이 있으면 현재 active node로 지정한다.
    if (child) {
      current = child
      continue
    }

    //가장 상위 노드까지 올라간 상황이라면 그냥 함수를 끝낸다.
    if (current === root) {
      return
    }

    //형제 노드를 찾을 때까지 while문을 돌린다. 이 함수에서는 자식에서 부모로 올라가면서 형제가 있는지를 찾아주는 역할을 하고 있다.
    while (!current.sibling) {
      //top 노드에 도달했으면 그냥 끝낸다.
      if (!current.return || current.return === root) {
        return
      }

      //부모노드를 현재 노드에 넣어준다.
      current = current.return
    }
    current = current.sibling // while문을 빠져나왔다는 것은 sibling을 찾았다는 것이다. 찾은 sibling을 현재 current node에 넣어준다.
  }
}
```

중요한 점은 이 함수를 사용하면 **스택이 계속해서 쌓이지 않는다는 것**!
즉, call stack의 가장 아래에는 walk 함수가 깔려있고 계속해서 doWork 함수가 호출되었다가 사라짐

이 함수의 핵심은 current node에 대한 참조를 계속해서 유지하기 때문에, 이 함수가 중간에 멈춘다 할지라도 current node로 돌아와서 작업을 재개할 수 있게 됨

이런 구조를 통해서, 재귀적 순회가 가진 문제점을 해결함
재귀는 한번 시작하면 끝까지 실행 해야만 하지만, 이제는 중간에 멈춰도 이전의 작업 기록이 남아있으니, 마음놓고 멈출 수 있음


**결론) fiber 트리는 자식 요소들 간의 단순 연결 리스트(sibling 관계)와 부모-자식 관계의 연결 리스트로 이루어져 있고, 트리는 깊이 우선 탐색 통해 순회**


---


**파이버와 리액트 요소의 차이점**
- 리액트 요소는 렌더링이 발생할 때마다 새롭게 생성되지만, 파이버는 컴포넌트가 최초로 마운트되는 시점에 생성되어 이후에는 **가급적이면 재사용됨**
- 리액트에 작성돼 있는 파이버 생성하는 다양한 함수를 보면, 1:1 관계를 확인할 수 있음
		
```javascript
function createFiber(
  tag,
  pendingProps,
  key,
  mode,
): Fiber {
  return new FiberNode(tag, pendingProps, key, mode);
}

// 생략 ...

function createFiberFromElement(
  element,
  mode,
  lanes,
): Fiber {
  let source = null;
  let owner = null;
  if (__DEV__) {
    source = element._source;
    owner = element._owner;
  }
  
  const type = element.type;
  const key = element.key;
  const pendingProps = element.props;
  const fiber = createFiberFromTypeAndProps(
    type,
    key,
    pendingProps,
    source,
    owner,
    mode,
    lanes,
  );
  
  if (__DEV__) {
    fiber._debugSource = element._source;
    fiber._debugOwner = element._owner;
  }
  
  return fiber;
}

function createFiberFromFragment(
  elements,
  mode,
  lanes,
  key,
): Fiber {
  const fiber = createFiber(Fragment, elements, key, mode);
  fiber.lanes = lanes;
  return fiber;
}

```

일반적인 리액트 애플리케이션은 트리를 비교해서 업데이트하는 작업은 시도 때도 없이 일어남 → 반복적인 재조정 작업 때마다 새롭게 파이버 객체를 만드는 것은 리소스 낭비라고 볼 수 있기 때문에 가급적 객체를 새롭게 만들기보다는 기존에 있는 객체를 재활용하기 위해 내부 속성값만 초기화하거나 바꾸는 형태로 트리를 업데이트함

---

과거에 트리 업데이트 과정은 재귀적으로 하나의 트리를 순회해 새로운 트리를 만드는 작업은 동기식이고 중단될 수 없었지만, 현재는 우선순위가 높은 다른 업데이트가 오면 현재 업데이트 작업을 일시 중단하거나 새롭게 만들거나 폐기할 수도 있고, 작업 단위를 나누어 우선순위를 할당하는 것 또한 가능함

리액트는 이러한 작업을 파이버 단위로 나눠서 수행하는데, 애니메이션이나 사용자가 입력하는 작업은 우선순위가 높은 작업으로 분리하거나 목록을 렌더링하는 등의 작업은 우선순위가 낮은 작업으로 분리해 최적의 순위로 작업을 완료할 수 있게끔 만듦

&nbsp;


## 리액트 파이버 트리
- 파이버 트리는 리액트 내부에 2개가 존재함
	한 개는 현재 모습을 담은 파이버 트리, 다른 하나는 작업 중인 상태를 나타내는 `workInProgress` 트리
- 리액트 파이버 작업이 끝나면 리액트는 단순히 포인터만 변경해 `workInProgress` 트리를 현재 트리로 바꿔버림  → `더블 버퍼링` 

---
**더블 버퍼링**
내부적 처리를 거치게 되면 사용자에게 미처 다 그리지 못한 모습을 보여줄 수 있기 때문에, 이러한 상황을 방지하기 위해 보이지 않는 곳에서 그려야 할 그림을 미리 그린 다음 완성되면 현재 상태를 새로운 그림으로 바꾸는 기법

----
더블 버퍼링 기법을 위해 트리가 두 개 존재하는 것, 이 더블 버퍼링은 커밋 단계에서 수행됨

- 리액트 파이버 트리 모습
![](https://i.imgur.com/pPsFWjm.png)

현재 UI 렌더링을 위해 존재하는 트리인 current 기준으로 모든 작업이 시작됨 → 만약 업데이트가 발생하면, 파이버는 리액트에서 새로 받은 데이터를 새로운 workInProgress 트리를 빌드하기 시작함 → workInProgress 트리를 빌드하는 작업이 끝나면 다음 렌더링에 이 트리를 사용함 → workInProgress 트리가 UI에 최종적으로 렌더링되어 반영이 완료되면 current가 workingInProgress로 변경됨

&nbsp;

## 파이버의 작업 순서
> 파이버 트리와 파이버의 작동 흐름


- 파이버는 **하나의 작업 단위**로 구성돼 있음
	리액트는 이러한 작업 단위를 하나씩 처리하고 `finishedWork()`라는 작업으로 마무리 한 후 이 작업을 커밋해 실제 브라우저 DOM에 가시적인 변경 사항을 만들어 냄
  
- 작업 단계
	1. **렌더 단계** : 사용자에게 노출되지 않는 모든 비동기 작업을 수행함 → 파이버의 작업, 우선순위를 지정하거나 중지시키거나 버리는 등의 작업이 일어남
	2. **커밋 단계** : DOM에 실제 변경 사항을 반영하기 위한 작업 → `commitWork()`가 실행되는데, 이 과정은 동기식으로 일어나고 중단될 수도 없음
  

&nbsp;
    

**일반적인 파이버 노드의 생성 흐름**
1. `beginWork()` 함수를 실행해 파이버 작업을 수행하는데, 더 이상 자식이 없는 파이버를 만날 때까지 트리 형식으로 시작됨
2. 1번에서 작업이 끝난다면 그다음 `completeWork()` 함수를 실행해 파이버 작업을 완료함
3. 형제가 있다면 형제로 넘어감
4. 2,3 번이 모두 끝났다면 `return`으로 돌아가 자신의 작업이 완료됐음을 알림

&nbsp;

**예시**

```jsx
<A1>
	<B1></B1>
	<B2>
		<C1>
			<D1 />
			<D2 />
		</C1>
	</B2>
	<B3 />
</A1>
```

1. A1은 beingWork()가 수행됨
2. A1은 자식이 있으므로 B1로 이동해 beginWork() 수행함
3. B1은 자식이 없으므로 completeWork()가 수행되고, 자식은 없으므로 형제인 B2로 넘어감
4. B2의 beginWork()가 수행되고, 자식이 있으므로 C1로 이동함
5. C1의 beginWork()가 수행되고, 자식이 있으므로 D1로 이동함
6. D1의 beginWork()가 수행됨
7. D1은 자식이 없으므로 completeWork()가 수행되고, 자식은 없으므로 형제인 D2로 넘어감
8. D2는 자식이 없으므로 completeWork()가 수행됨
9. D2는 자식도 더 이상의 형제도 없으므로 위로 이동해 D1, C1, B2 순으로 completeWork()를 호출함
10. B2는 형제인 B3으로 이동해 beginWork() 수행함
11. B3의 completeWork()가 수행되면 반환해 상위로 타고 올라감
12. A1의 completeWork()가 수행됨
13. 루트 노드가 완성되는 순간, 최종적으로 commitWork()가 수행되고 이 중에 변경 사항을 비교해 업데이트가 필요한 변경 사항이 DOM에 반영됨


![](https://i.imgur.com/lKbYLK4.png)



## 파이버와 가상 DOM
> 리액트 파이버는 리액트 네이티브와 같은 브라우저가 아닌 환경에서도 사용할 수 있기 때문에 **파이버와 가상 DOM은 동일한 개념이 아님** (가상 DOM은 웹 애플리케이션에서만 통용되는 개념)

리액트 컴포넌트에 대한 정보를 1:1로 가지고 있는 것이 **파이버**, 파이버는 리액트 아키텍처 내부에서 **비동기로 이루어짐**

이러한 비동기 작업과는 달리, 실제 브라우저 구조인 DOM에 반영하는 것은 동기적으로 일어나야 하고, 또 처리하는 작업이 많아 화면에 불완전하게 표시될 수 있는 가능성이 높으므로 이러한 작업을 가상에서, 즉 메모리상에서 먼저 수행해서 최종 결과물만 실제 브라우저 DOM에 적용하는 것

&nbsp;



# Vue의 Virtual DOM 최적화

기존 Vue의 렌더링을 위한 virtual DOM 설계는 변경이 필요한 부분만 확인하는 것이 아닌 매번 전체 트리를 확인했기 때문에 비효율적이고 불필요한 탐색이 포함될 수밖에 없었음

Vue는 이같이 불필요한 탐색을 제거하고 렌더링 성능을 향상시키고자 Vue.js 3.0에서 Virtual DOM 최적화 작업을 진행하였음

- 첫 번째로 템플릿 구문에서 **정적 요소**와 **동적 요소**를 구분하여 트리를 순환할 때 동적 요소만 순환할 수 있도록 함

  구문 내의 정적인 영역을 미리 블록으로 구분하여 렌더링시 정적 블록에는 접근하지 않고 **동적인 요소가 있는 코드에만 접근해** 렌더링 트리의 탐색을 최적화하는 방식

- 두 번째로 렌더링 시 객체가 여러 번 생성되는 것을 방지하기 위하여 컴파일러가 미리 템플릿 구문 내 정적 요소, 서브 트리, 데이터 객체 등을 탐지해 렌더러(Renderer) 함수 밖으로 `호이스팅(Hoisting)` 함

  이를 통해 렌더링 시 렌더러마다 객체를 다시 생성하는 것을 방지하여 **메모리 사용량을 낮춤**

- 세 번째로 컴파일러가 미리 템플릿 구문 내에서 **동적 바인딩 요소에 대해 플래그를 생성함**

  컴파일러가 미리 생성해 둔 플래그로 필요한 부분만 처리하여 **렌더링 속도를 향상**시킬 수 있었음



## Vue의 Tree-Shaking

`트리쉐이킹`은 나무를 흔들어 잎을 떨어뜨리듯 모듈을 번들링하는 과정에서 **사용하지 않는 코드를 제거**하여 파일 크기를 줄이고 로딩 성능을 향상시키는 최적화 방안을 의미

 Vue3에서 이를 강화하여 번들 크기를 절반 이상으로 대폭 줄일 수 있었음

![img](https://tech.osci.kr/wp-content/uploads/2022/05/7afe96b0-ed0c-4538-8dc0-641e2cee2d46.png)**출처: Vue 공식문서**



## Vue가 React보다 렌더링 관점에서 좋은 점

-  React는 상태가 변경되면 해당 컴포넌트부터 자식 컴포넌트 트리까지 리렌더링하지만, Vue는 렌더링 중 **컴포넌트의 종속성이 자동 추적**되기 때문에 실제로 다시 렌더링해야하는 컴포넌트를 정확히 알고 변경해줌
- 렌더링 성능의 핵심은 **DOM 조작 관련 작업을 최소화**하는 것으로 최소한의 오버헤드만 가하는 것인데, 같은 조건의 **DOM 조작시 최소한의 오버헤드** 측면에서 Vue의 가상돔이 훨씬 가벼움