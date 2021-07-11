加载外部的glsl文件为shader源

```typescript
async function loadShaderFromFile(filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
        let request: XMLHttpRequest = new XMLHttpRequest();
        const onError = (err) => { reject(JSON.stringify(err)) };
        request.onreadystatechange = () => {
            if (request.readyState === 4 && (request.status === 200 || request.status === 0)) {
                console.log(request.responseText)
                resolve(request.responseText);
            }
        }
        request.onerror = (err) => {
            onError(err);
        }
        request.open('GET', filename, true);
        request.send();
    })
}
```

为正方形定点指定颜色，会自动在内部差值，达到渐变效果，用varying在vertex和fragment之间传递，varying值不需要在主程序中指定。(attrib需要放到缓存，并指定读缓存方式来按顺序读缓存的值，uniform则是统一指定一次值)

![image-20210711195155512](C:\Users\ljd\AppData\Roaming\Typora\typora-user-images\image-20210711195155512.png)