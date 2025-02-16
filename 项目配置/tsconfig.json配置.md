+ "baseUrl"- 这表示项目中的根文件夹是当前文件夹。这意味着在编译器中使用相对路径来引用文件时，它们将从项目根文件夹开始解析。
+ `"paths": {"@/": ["./src/"]}` - 这表示当使用路径别名"@/"时，编译器将解析到`"./src/"`文件夹中的文件。例如，如果你在代码中使用了`import "@/components/Button"`，编译器将解析到`"./src/components/Button"`。

```json
{
  /* ... */
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

```

