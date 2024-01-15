# 00. DOM이란?

DOM은 Document Object Model로, HTML 문서에 작성된 코드가 화면 상 출력되고 이벤트에 반응하여 값을 입력받는 등 기능을 수행할 객체들로 실체화된 형태를 의미한다.

<img src="https://i.imgur.com/TZnfFhi.png" width="400" />

<br />

# 01. React의 Virtual DOM

## ① Virtual DOM 등장 배경

<span style='background-color:#ffdce0'>**❗️웹 어플리케이션이 거대해질수록, DOM 조작은 갈수록 더 큰 비용이 드는 것에 비해 속도가 매우 느렸다.**</span>

> 예를 들어 부모 엘리먼트 일부분을 변경하면, 변경될 필요가 없는 나머지 children 엘리먼트도 재렌더링되어 비효율적이다.

따라서 **DOM 변경을 최소화**하고, **성능 향상** 및 **브라우저 간 호환성 향상**을 위해 Virtual DOM이 도입되었다.

## ② Virtual DOM이란

Virtual DOM은 HTML문서를 파싱한 <u>DOM Tree의 추상화 개념</u>이다.
작성된 react 컴포넌트는 React Element로 변환된다. React Element는 기존의 DOM과 빠르고 쉽게 비교 및 업데이트하는 작업을 거쳐 새로운 Virtual DOM에 삽입된다.

> **❗️ 즉 Virtual DOM은 실제 DOM의 변경사항을 확인해 한번의 렌더링으로 업데이트한다.**

이 과정을 **Reconciliation, 재조정**이라고 한다.

<br />

# 02. Reconciliation(재조정)

React의 `render 함수`는 React의 컴포넌트가 재레더링되면, **새로운 React 엘리먼트 트리를 반환**하는데, 이때 재렌더링되는 조건은 다음과 같다.

> 1. state가 변경될 때
> 2. props가 변경될 때
> 3. 부모 컴포넌트가 재렌더링 될 때

여기서 기존의 DOM Tree와 변경된 요소를 확인 해 → 새로운 DOM Tree를 그리는 과정에서, 가장 효율적인 UI 갱신 방법으로 **비교 알고리즘(Diff Algorithm)** 을 사용한다.

## ① React의 비교 알고리즘(Diffing Algorithm)

비교 알고리즘은 기존의 트리와 새 트리에서 변경된 요소가 무엇인지 비교할 때 몇가지 따르는 순서가 있다.
![](https://i.imgur.com/pIdqdZM.png)

가장 먼저 **❶ 두 엘리먼트의 루트(root) 엘리먼트부터 비교**한다.

```jsx
<ul>
  <li>first</li>
  <li>second</li>
</ul>
```

```jsx
<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

**❷ If) 두 루트 엘리먼트의 타입이 다른 경우**

- React는 이전 트리를 버리고 완전히 새로운 트리를 구축한다.
- 또한 이전 DOM 노드가 파괴되고, 루트 엘리먼트 하위 컴포넌트도 모두 언마운트된다.

❸ **If) 두 루트 엘리먼트의 타입이 같은 경우**

- 두 엘리먼트의 속성을 비교해 변경된 속성만 갱신한다.
- 먼저 DOM 노드부터 시작해 → 해당 노드의 자식 순으로 재귀적으로 갱신 처리한다.
  > **👀 이때 주의할 점!**
  >
  > 만약 위 코드처럼 노드의 마지막 자식 요소로 추가되는 경우는 문제가 되지 않지만, 처음이나 중간에 추가/삭제 등 변경되는 경우, **비교 알고리즘은 모든 요소가 변경되었다고 판단**한다.
  >
  > 때문에 변경된 요소만이 아닌, 모든 자식 요소들을 다시 변경하게 되는 비효율적인 렌더링이 발생한다.
  >
  > React는 이러한 문제를 해결하기 위해 `key 속성`을 사용한다.

## ② Key 속성

> `key 속성`은 React가 어떤 항목을 변경, 추가, 삭제할지 식별하는 것을 돕는 역할을 한다.
> Key는 고유한 값(unique)을 가져야 하며, 전역적으로 유일할 필요는 없고 형제 사이에서만 유일하면 된다.

React에서 `map` 등 고차함수를 사용해 컴포넌트를 반복적으로 생성할 때,  `'Warning: Each child in a list should have a unique "key" prop.’` 와 같은 경고를 마주치게 된다.

![](https://i.imgur.com/9uQE6fJ.png)

`key 속성`은 **재조정**이 실행될 때, 더 이상 모든 요소를 렌더링하지 않고, **추가된 부분만 재렌더링해 효율적인 렌더링**을 실현하기 위해 사용한다.
앞서 봤던 예시와 같이 끝이 아닌, 처음이나 중간 요소가 변경되는 상황을 **최적화**하기 위함이다.

단 `key 속성` 사용 시 주의해야할 점이 있다.

> **"key는 반드시 변하지 않고 예상 가능하며, 유일해야 한다."**

따라서 요소의 순서에 따라 변경될 수 있는 `index`나 `Math.random()`으로 생성된 값 등은 key 속성으로 적절하지 않다.

- 만약 이러한 값을 key값으로 사용할 경우, 많은 컴포넌트 인스턴스와 DOM 노드를 불필요하게 재생성하여 성능이 나빠지거나, 자식 컴포넌트의 state 유실 가능성이 있다.

`key 속성`은 해당 데이터가 갖는 id 값이나, 별도 고유 id 라이브러리 등을 사용해 언제나 key 값이 고유하도록 보장하는 것이 중요하다.

<br />

# 03. virtual DOM의 구현과정 엿보기

### ✷ 예시 코드

```jsx
<ul className="list">
  <li>item 1</li>
  <li>item 2</li>
</ul>
```

### ❶ JSX → Babel → Transfiling

```jsx
React.createElement(
  "ul",
  { className: "list" },
  React.createElement("li", {}, "item 1"),
  React.createElement("li", {}, "item 2"),
);
```

### ❷ React.createElement 대체 함수로 → Virtual DOM 생성

```jsx
const a = {
  type: "ul",
  props: { className: "list" },
  children: [
    { type: "li", props: {}, children: ["item 1"] },
    { type: "li", props: {}, children: ["item 2"] },
  ],
};
```

### ❸ createElement 함수를 작성해 Virtual DOM → Real DOM으로 변경

- Virtual DOM Node를 파라미터로 받아, Real DOM Node를 리턴하는 createElement 함수를 작성한다.(props제외)
- 이때 변수 앞의 $은 실제 돔 표현을 구분하기 위해 사용한다.
- 이 과정을 통해 **Virtual DOM → Real DOM으로 변경**된다.

```jsx
function createElement(node) {
  if (typeof node === "string") {
    //노드가 string이면
    return document.createTextNode(node); //텍스트노드반환
  }
  const $el = document.createElement(node.type); //해당 노드 타입으로 엘리먼트 생성
  node.children
    .map(createElement) //children 재귀처리
    .forEach($el.appendChild.bind($el)); //children들을 생성된 엘리먼트의 자식으로 append
  return $el; //해당 element 반환
}
```

### ❹ 비교 알고리즘 만들기

- Virtual DOM 트리의 변화를 감지해 업데이트하는 비교 알고리즘을 만든다.
  - 여기서 old, new 라는 두 개의 가상 돔 트리를 비교해 실제 돔에 필요한 변경만 수행한다.
  - $parent : 가상 노드의 실제 DOM 요소 / index : 부모 엘리먼트에 있는 노드의 위치

#### 1. updateElement 함수

: 두 노드를 비교해 노드가 실제로 변경되었는지 알려주는 함수

```jsx
function updateElement($parent, newNode, oldNode, index = 0) {
  if (!oldNode) {
    // 이전 노드가 없는 경우(노드가 새로 추가된 경우)
    $parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    // 새로운 노드가 없는 경우(노드를 삭제해야 하는 경우)
    $parent.removeChild($parent.childNodes[index]);
  }
}
```

#### 2. changed 함수

: 노드의 변경을 적용한다.

```jsx
function changed(node1, node2) {
  return typeof node1 !== typeof node2 ||
         typeof node1 === ‘string’ && node1 !== node2 ||
         node1.type !== node2.type
}
```

#### 3. updateElement 함수 재귀 호출

: 마지막으로 두 노드의 children을 비교한 후, 마지막 노드를 만날 때까지 updateElement 함수를 재귀적으로 호출한다.

```jsx
function updateElement($parent, newNode, oldNode, index = 0) {
  if (!oldNode) {
    $parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    $parent.removeChild($parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
  }
}
```

> ❗️ **이때 주의할 점**
>
> 1.  텍스트 노드는 자식(children)을 가질 수 없으므로, 엘리먼트 노드만 비교해야 한다.
> 2.  모든 자식(children)을 하나씩 비교해야 한다.

### ❺ 최종 가상돔 구현

```jsx
function updateElement($parent, newNode, oldNode, index = 0) {
  if (!oldNode) {
    $parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    $parent.removeChild($parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
  } else if (newNode.type) {
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i,
      );
    }
  }
}
```

<br />

# 04. Vue의 내부 렌더링 메커니즘

## ① Vue의 Life-cycle

> 라이프 사이클은 컴포넌트가 브라우저 화면에 그려지고 사라지기까지의 과정을 말한다.

라이프 사이클에는 여러 단계가 정의되어 있고, Vue 프레임워크는 개발자가 단계마다 로직을 사용해 컴포넌트를 조작할 수 있도록 훅(hook)이라는 함수를 지원한다.

![](https://i.imgur.com/RgFlpGP.png)

<br />

## ② Vue와 Virtual DOM

> **Virtual DOM(VDOM)** 은 UI의 이상적인 또는 '가상' 표현이 메모리에 유지되고 '실제'DOM과 동기화되는 프로그래밍 개념을 말한다.

Vue의 렌더링 시스템은 **Virtual DOM**을 기반으로 하는데, 가상돔은 특정 기술이라기보단 패턴에 가깝기 때문에 표준적인 구현이 없다.

```js
const vnode = {
  type: "div",
  props: { id: "hello" },
  children: [
    /* more vnodes */
  ],
};
```

> 1. `vnode`는 일반 Javascript 개체로 가상 노드이다.
> 2. `div` : 실제 요소를 생성하는 데 필요한 모든 정보가 포함된다. 가상 DOM 트리의 Root 요소가 된다.

RunTime Renderer는 가상 DOM Tree를 탐색하고 여기에서 실제 DOM 트리를 구성할 수 있는데, 이 프로세스를 **"마운트"** 라고 한다.

가상 DOM Tree의 복사본이 두 개 있는 경우, 렌더러는 두 트리를 비교해 차이점을 파악하고 해당 변경 사항을 실제 DOM에 적용할 수 있다. 해당 프로세스를 **"패치"** 하며, `조정`의 뜻을 가진다.

Vue의 가상 DOM의 주요 장점은 개발자가 선언적 방식으로 원하는 UI 구조를 프로그래밍 방식으로 생성, 검사 및 구성할 수 있는 기능을 제공하는 동시에 직접적인 DOM 조작은 렌더러에게 맡길 수 있다는 것이다.

<br />

## ③ Vue의 Render Pipeline

![](https://i.imgur.com/dRebC3Q.png)

1. **Compiled** : Vue 템플릿은 Render 함수(가상 DOM Tree를 반환하는 함수)로 컴파일 된다. 이 단계는 빌드 단계를 통해 미리 수행하거나 런타임 컴파일러를 사용해 즉시 수행할 수 있다.
2. **Mount** : 런타임 렌더러는 render 함수를 호출하고 반환된 가상 DOM Tree를 탐색해 이를 기반으로 실제 DOM 노드를 생성한다. 이 단계는 반응 효과로 수행되므로, 사용된 모든 반응 종속성을 추적한다.
3. **Patch** : 마운트 변경 시 사용된 종속성이 변경되면 효과가 다시 실행되는데, 이때 새롭게 업데이트된 Virtual DOM Tree가 생성된다. 런타임 렌더러는 새 트리를 탐색하고 이전 트리와 비교한 다음 실제 DOM에 필요한 업데이트를 적용한다.

<br />

## ④ Compiler-Informed Virtual DOM (컴파일러 기반 가상 돔)

### ✷ 배경

React의 가상 DOM 구현과 더불어 대부분의 가상 DOM 구현은 런타임에서 이루어진다.

Diff 알고리즘은 비교할 가상 DOM 트리에 대해 어떠한 가정도 할 수 없으므로 변경 사항을 확인해 업데이트 하려면,
**→ 트리 전체를 완전히 순회하고 모든 vnode의 props를 비교해야 한다.**

하지만 트리의 극히 일부분만 변경되더라도 다시 렌더링할 때마다 항상 vnode가 생성되어 불필요한 메모리 낭비 문제가 발생하였다.

이 문제를 해결하기 위해 **<font color="#d83931">컴파일러와 런타임을 모두 제어하는 Vue가 등장</font>** 하게 되었다.

### ✷ 컴파일러 기반 가상 돔

- Vue의 컴파일러는 템플릿을 정적으로 분석하고 생성된 코드에 힌트를 남겨 런타임이 가능할 때마다 바로가기를 사용할 수 있게 한다.
- 사용자가 직접적인 제어를 원할 경우, **렌더링 기능 레이어**를 통해 드롭다운 할 수 있게 한다.
- 이처럼 컴파일러와 런타임이 긴밀하게 결합된 렌더러를 통해 컴파일 시간 최적화를 구현할 수 있었다.
- 그리고 이러한 하이브리드 접근 방식을 **Compiler-Informed Virtual DOM** 이라고 부른다.

<br />

## ⑤ Vue의 reactivity System(반응형 시스템)

> **Reactivity System(반응형 시스템)** 은 component data property의 상태 혹은 변화된 상태를 Virtual DOM에 반영하는 작업을 자동으로 해주는 프로세스를 말한다.

![](https://i.imgur.com/tLbgYq8.png)

### ❶ Getter

1. 처음 렌더링이 동작하면, Data property에 touched하여 getter함수가 호출된다.
2. 호출된 getter 함수는 종속적으로 data property의 상태값들을 모으기 위해 watcher를 호출한다.
3. watcher는 component Render Function을 호출하고, 호출된 렌더 함수는 data property들을 Virtual DOM Tree에 반영한다.

### ❷ Setter

1. data property가 변경되면, Setter 함수가 실행된다.
2. Setter 함수는 watcher에게 변경된 데이터에 대해 알린다.
3. 전달 받은 watcher는 변경된 data property에 대해 Component Render Function을 실행해 Virtual DOM에 변경 항태를 반영한다.

> 💡 **TIP!**
>
> **Reactivity System** 은 Vue 라이프 사이클에서 Created 훅 전에 Vue 인스턴스에 주입된다.  
> 👉 때문에 Created 훅부터 Vue Component의 data property에 접근에 로직을 작성할 수 있다.

<br />
<br />

> 📂 참고자료
>
> - [Virtual DOM](https://jewelism.github.io/fe/virtual-dom.html#%EC%9E%AC%EC%A1%B0%EC%A0%95-reconciliation)
> - [DOM vs Virtual DOM](https://velog.io/@ye-ji/DOM-vs-Virtual-DOM)
> - [[Vue] Virtual DOM은 대체 무엇인가](https://uhjee.github.io/vue/what-is-virtual-dom/)
> - [Vue : Virtual DOM과 Vue 렌더링 원리 알아보기](https://pinokio0702.tistory.com/363)
> - [Vue 공식문서](https://vuejs.org/guide/extras/rendering-mechanism)
