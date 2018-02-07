


```js
//simple scene scheme
{
	assets: [],
	label: [
		{ pr: 'hello world' },
		{ al: 'Hello Professor' }
	],
	characters: [
		{
			al: { name: 'Alice', textColor: 'red' }
		},
		{
			pr: { name: 'Professor', textColor: 'green' }
		}
	]
}


```


```yaml
# characters.yaml - generate sdk/cli

- al:
   name: Alice
   textColor: red
- pr:
   name: Professor
   textColor: green

```


```js
Call on character aliase (pr, al)

proxy listener all charactes

vnjs.on('character', data=>{
	let { reply, aliase, param } = data;

	console.log( param.name ) // Professor / Alice
	console.log( reply ) // hello world / Hello Professor
})

```