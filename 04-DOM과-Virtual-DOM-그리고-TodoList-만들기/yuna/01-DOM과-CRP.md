# DOM(Document Object Model)

> [*What, exactly, is the DOM?*](https://bitsofco.de/what-exactly-is-the-dom/?utm_source=CSS-Weekly&utm_campaign=Issue-341&utm_medium=email)

- DOM(Document Object Model)은 웹 페이지에 대한 인터페이스
- HTML, XML document와 상호작용하고 표현하는 API이며, 브라우저 상에서 자바스크립트가 HTML 문서를 조작하기 위한 API

- DOM은 browser에서 로드되며, Node 트리(각 노드는 document의 부분을 나타냄)로 표현하는 document 모델
- DOM은 브라우저가 웹페이지의 콘텐츠와 구조를 어떻게 보여줄지에 대한 정보를 담고 있음

![](https://velog.velcdn.com/images/kukoo/post/e777fb40-099f-4e7e-abd0-9694defb192c/image.png)

&nbsp;

# Critical Rendering Path (CRP)

> 웹 브라우저가 원본 HTML 문서를 읽어들인 후, 스타일을 입히고 대화형 페이지로 만들어 뷰 포트에 표시하기까지의 과정 
>
> 즉, 브라우저가 서버로부터 HTML 응답을 받아 화면을 그리기 위해 실행하는 과정 

<br />

💡 **자세한 내용은 1주차 내용 참고!!**

![](https://velog.velcdn.com/images/kukoo/post/ab6dcacc-9184-4671-85ed-99017640efd0/image.png)


1. 브라우저가 사용자가 요청한 주소를 방문해 HTML 파일을 다운로드함

2. 브라우저 렌더링 엔진은 HTML을 `파싱`해 DOM 노드로 구성된 트리 (DOM)를 만듦

   - DOM(Document Object Model) – HTML 요소들의 구조화된 표현

3. 2번 과정에서 CSS 파일을 만나면 해당 CSS 파일도 다운로드함

4. 브라우저 렌더링 엔진은 이 CSS도 파싱해 CSS 노드로 구성된 트리 (CSSOM)을 만듦 (DOM 트리 구축과 **동시에** 일어나게 됨)

   - CSSOM(Cascading Style Sheets Object Model) – 요소들과 연관된 스타일 정보의 구조화된 표현

5. 브라우저는 2번에 만든 DOM 노드를 순회하는데, 모든 노드를 방문하는 것이 아니고 트리를 분석하는 과정을 조금이라도 빠르게 하기 위해서 사용자 눈에 보이는 노드만 방문하여 렌더 트리를 생성함

  이 때,  `<head>` 태그와 그 자식 요소 혹은 `display: none` 스타일 속성을 가진 요소와 같이  화면에 나타나지 않는 태그의 경우 렌더 트리에 포함되지 않고,  `font-size` 등 상속적인 스타일은 부모 노드에만 위치하도록 설계하는 등 최적화를 거쳐 렌더 레이어가 완성됨 (오직 화면에 렌더링 되는 노드만으로 구성됨)

6. 5번에서 제외된, 눈에 보이는 노드를 대상으로 해당 노드에 대한 CSSOM 정보를 찾고 여기서 발견한 CSS `스타일` 정보를 노드에 적용함 (브라우저 뷰 포트에 보이는 것은 렌더 트리로 DOM과 CSSOM의 조합!)

  **DOM 노드에 CSS를 적용하는 과정**

  - `레이아웃 (layout, reflow)` : 각 노드가 브라우저 화면의 어느 좌표에 정확히 나타나야 하는지 계산하는 과정 (레이아웃 과정을 거치면 반드시 페인팅 과정도 거치게 됨)
  - `페인팅 (painting)` : 레이아웃 단계를 거친 노드에 색과 같은 실제 유효한 모습을 그리는 과정

→ 최종 출력물은 웹 애플리케이션의 모든 콘텐츠와 스타일 정보를 갖게 됨

![](https://i.imgur.com/WgT0gLr.png)
*출처 : https://web.dev/articles/critical-rendering-path/render-tree-construction?hl=ko*

<br />

## 성능

스타일 → 레이아웃 → 페인트 → 합성을 **렌더링**이라고 하며, 이 렌더링 과정은 상황에 따라 반복하여 발생할 수 있음
<br />    

 - **Reflow(=Layout) 발생하는 경우 **→ 렌더 트리가 재구성됨 (레이아웃부터 과정 수행)
	- DOM의 추가/삭제
	- CSS 속성 변경을 통해 기하학적(높이/넓이/위치 등)인 변화
	ex) margin, padding, width, height, ...

- **Repaint(=Paint)가 발생하는 경우** (페인트부터 과정 수행)
	- CSS 속성 변경이 기하학적 변화가 발생하지 않았을 경우
	ex) color, background, transform, box-shadow, ...

<br />

💡 그렇다면, **브라우저에서 제일 성능을 많이 잡아먹는 작업**은 무엇일까?

👉🏻 브라우저는 레이아웃이 일어나면 전체 픽셀을 다시 계산해야 하므로 부하가 큰 반면 리페인트는 이미 계산된 픽셀값을 이용해 화면을 그리기 때문에 레이아웃에 비해 부하가 적음

그래서 **reflow가 순간적으로 많이 발생할 경우 성능에 치명적**



![](https://velog.velcdn.com/images/kukoo/post/e2d9ad79-60e1-47a8-9bc7-43fa9cf6d888/image.png)

<br />

다음은 어떤 엘리먼트에 레이아웃과 리페인트를 발생시키는 CSS 속성과 해당 속성값을 변경했을 때 차이를 보여줌

```html
<div id="sample" style="background:red;width:150px;height:50px;">
  Sample
</div>
```

<br />

**요소에 기하적인 영향을 주는 CSS 속성값 변경**

- CSS 속성값 : `height`, `width`, `left`, `top`, `font-size`, `line-height` 등

  ```jsx
  const example = document.getElementById('example');
  
  example.style.width = '400px';
  ```

- 레이아웃 발생

  ![1](../../01-브라우저-동작-원리와-렌더링-과정/yuna/images/1.png)

<br />

**요소에 기하적인 영향을 주지 않는 CSS 속성값 변경**

- CSS 속성값 : `background-color`, `color`, `visibility`, `text-decoration` 등

  ```jsx
  const sample = document.getElementById('example');
  
  example.style.backgroundColor = 'blue';
  ```

- 리페인트 발생

  ![22](../../01-브라우저-동작-원리와-렌더링-과정/yuna/images/22.png)

<br />

**결론 ) 레이아웃이 발생하면 실행 시간만큼 렌더링 시간도 늘어나게 되기 때문에 불필요한 레이아웃이 발생하지 않도록 신경 써야 함**

<br />