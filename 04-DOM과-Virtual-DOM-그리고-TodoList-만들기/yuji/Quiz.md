# 💟 오늘의 문제 💟

### 1. Virtual DOM이 DOM보다 빠르다.

 <br>
<details>
<summary>정답</summary>
❌<br>
정보 제공만 하는 웹 페이지라면, 아무런 인터렉션이 발생하지 않기 때문에 DOM tree의 변화가 발생하지 않아서, 일반 DOM의 성능이 더 좋을 수 있다
</details>

### 2. Incremental DOM은 애플리케이션 UI를 다시 렌더링할 때 실제 DOM을 복사하여 생성한다.

<br>
<details>
<summary>정답</summary>
❌
<br>
Virtual DOM과 다르게, Incremental DOM은 애플리케이션 UI를 다시 렌더링할 때 실제 DOM을 복사해서 생성하지 않는다.또한, 애플리케이션 UI에 변경이 없다면 메모리를 할당하지도 않는다. 
<br>
→ Incremental DOM의 접근 방식은 메모리 사용을 크게 줄여준다.
</details>

### 3. Single Page Applications (SPA)은 다중 페이지 애플리케이션과 비교해 보다 많은 클라이언트 측에서의 DOM 조작이 발생한다.

<br>
<details>
<summary>정답</summary>
🅾️
SPA는 페이지를 다시 로드하지 않고도 화면을 업데이트 하기 때문에, 사용자의 interaction에 따라 동적으로 컨텐츠를 업데이트하고 보여주는데 DOM 조작이 자주 필요하다. -> 가상돔 사용 고려
</details>
<br>
