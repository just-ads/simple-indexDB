# simple-indexDB
> 以对象储存的方式使用indexDB

## API
### load()
> 打开数据库成功后会调用此函数，返回一个Promise
> E.g:
```javascript
import sIndexDB from "simple-indexDB"
sIndexDB.load().then(db => {
  // do something
})
```

### set(key, value)
> 储存值，会覆盖原来的值
```javascript
import sIndexDB from "simple-indexDB"
sIndexDB.load().then(db => {
  sIndexDB.set('test', {taskTitle: "Walk dog", hours: 19, minutes: 30, day: 24, month: "December", year: 2013, notified: "no"})
  // do something
})
```

### get(key)
>获取值
```javascript
import sIndexDB from "simple-indexDB"
sIndexDB.load().then(db => {
  sIndexDB.get('test').then(data => {
    console.log(data)
    // {taskTitle: "Walk dog", hours: 19, minutes: 30, day: 24, month: "December", year: 2013, notified: "no"}
  })
  // 
  // do something
})
```
