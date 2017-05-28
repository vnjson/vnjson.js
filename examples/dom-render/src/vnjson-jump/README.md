## vnjson-jump

### Install

```bash
  git clone https://github.com/vnjson/vnjson-jump
  
```

### Usage

__`chapter1.yaml`__


```yaml
- print: hello
  background: img3
- print: world!
- jump: chapter2
```

__`chapter2.yaml`__

```yaml
- print: hello
  background: img3
- print: world!
- jump: volume2/start
```

__`volume2/start`__

```yaml
- print: game over
  background: go

```

__`program`__

```js
vnjs.parse({
        jump: 'scene/label'
      });

vnjs.parse({jump: 'label'});
```


## License 
> MIT License (MIT)