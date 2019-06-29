# SqlServer CRUD Apis
- select
- selectAll
- querySql
- add
- update
- del

# install iisnode

- install iisnode 
- install WebMatrix
- install URL rewrite module for IIS
- install iisnode express

# config iis site
```xml
<configuration>
  <system.webServer>

    <handlers>
      <add name="iisnode" path="index.js" verb="*" modules="iisnode" />
    </handlers>

    <rewrite>
      <rules>
        <rule name="myapp">
          <match url="myapp/*" />
          <action type="Rewrite" url="index.js" />
        </rule>
      </rules>
    </rewrite>
    
  </system.webServer>
</configuration>
```

# config inetpub/wwwroot
give `Full Control` to `IIS_IUSRS`