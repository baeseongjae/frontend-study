# Virtual DOM vs Incremental DOM



![img](https://blog.kakaocdn.net/dn/bP8tPK/btroWnEBEMS/5kimx0zxLxCjVYH6kFoTf1/img.png)**Virtual DOM**

![img](https://blog.kakaocdn.net/dn/VNqYk/btro37m3TKf/8Hf29Ih0iCvEkO49m3k8P1/img.png)**Incremental DOM**



### **virtual DOM**

- React, Vue에서는 DOM의 html 요소가 바뀔 때, 새로운 Virtual DOM을 만들어 놓고 기존의 Virtual DOM과 비교해서 (diffing) 필요한 부분만 바꿔줌
- 컴포넌트의 렌더링 결과를 값으로 받을 수 있고, 이를 테스트나 디버깅 등에 사용할 수 있음
- Virtual DOM을 사용하기에, 메모리 효율성이 떨어지고 개발자의 컴포넌트 구성에 따라 성능의 차이가 큼
  → 구성에 따라 render를 더 많이해서 virtual DOM을 더 많이 생성하게 되면 React의 PureComponent, memo 사용으로 비용을 최소화 시켜야 함



### **incremental DOM**

- 모든 컴포넌트는 일련의 명령으로 컴파일 되는데, 이 명령들은 데이터가 변경될 때 그 자리에서 DOM 트리를 만들고 업데이트 함
- Incremental DOM을 사용할 때, 프레임워크는 컴포넌트를 해석하지 않음
  대신, 컴포넌트는 명령들을 참조하게 되는데, 사용되지 않는 명령들은 컴파일러단에서 생략이 가능! (so called - Tree Shaking)
- virtual DOM은 인터프리터가 필요하고, 이는 실시간으로 동작하기 때문에 뭐가 필요한지 아닌지 알 수 없기 때문에 모든 것을 브라우저에 보내야 함
- incremental DOM은 가상 DOM이 필요 없기에 메모리를 많이 절약할 수 있고, 실제로 DOM node가 추가되거나 삭제될 때만 메모리를 할당함



![img](https://blog.kakaocdn.net/dn/brgxLM/btroZFEGY8B/aFm3L7tG7GkRFFELT3GeW1/img.png)**Incremental DOM 컴파일 -> instruction 생성 및 tree shaking**

![img](https://blog.kakaocdn.net/dn/bfzWhQ/btroVlmFeMG/yjUMPxaSPHHOWvvj5eSPk0/img.png)

![img](https://blog.kakaocdn.net/dn/Pfjvv/btroTml5Rdr/5uGKmi4aV4uUunEae9Amqk/img.png)

**추가 및 변경되는 부분만 메모리 할당**



###  

### **그래서 뭐가 더 좋은거지?**

```
💡 Incremental DOM은 메모리의 효율성에서 훨씬 뛰어나지만, 속도면에서는 Virtual DOM 방식이 더 빠름
```

결국, 앱의 성격에 맞는 것을 선택하면 됨



![img](https://blog.kakaocdn.net/dn/CDkTR/btroVj3tBH5/Epozt7WxOjb1lOaT9q28Y0/img.png)



###  

### **구글팀에서 Incremental DOM을 선택한 이유?**

```
💡 모바일 기기에서의 메모리 최적화를 위해 선택
```

→ 어플리케이션은 반드시 모바일 기기에서 문제 없이 작동해야 하고, 어플리케이션 번들의 용량(Tree shaking)과 메모리 점유율에 대한 최적화를 의미함

###  

# Svelte

> https://novemberde.github.io/post/2019/10/11/Svelte-revealjs/



 