const mssql = require("mssql");
const config = require("./conf.js")


const pool = new mssql.ConnectionPool(config);
const conn = pool.connect();

pool.on('error', err => {
  if (err) {
    throw err
  }
});

var prepareParms = (stat, params, fl, vl, el) => {
  if (params != "") {
    for (let index in params) {
      if (typeof params[index] == "number") {
        stat.input(index, mssql.Int);
        vl.push(params[index])
        el.push(`${index} = ${params[index]}`)
      } else if (typeof params[index] == "string") {
        stat.input(index, mssql.NVarChar);
        vl.push(`'${params[index]}'`)
        el.push(`${index} = '${params[index]}'`)
      }
      fl.push(index)
    }
  }
}

var prepareExec = (ps, sql, params, cb) => {
  ps.prepare(sql, err => {
    if (err) console.log(err);
    ps.execute(params, (err, ret) => {
      cb(err, ret);
      ps.unprepare(err => {
        if (err) console.log(err);
      });
    });
  });
}

var del = async function (table, where, cb) {
  await conn;
  try{
    let whereList  = []
    let ps = new mssql.PreparedStatement(pool)
    prepareParms(ps, where, [], [],  whereList)
    let whereSql  = whereList.join(' and ')
    let sql = `delete from ${table} where ${whereSql}`  
    prepareExec(ps, sql, "", cb)
  }catch(err){
    console.error('SQL error', err);
  }
};


var update = async (table, update, where, cb)=> {
  await conn;
  try{
    let updateList = []
    let whereList  = []
    let ps = new mssql.PreparedStatement(pool);
    prepareParms(ps, update, [], [], updateList)
    prepareParms(ps, where, [], [],  whereList)
    let updateSql = updateList.join(',')
    let whereSql  = whereList.join(' and ')
    let sql = `update ${table} set ${updateSql} where ${whereSql}`;
    
    prepareExec(ps, sql, "", cb)
  }catch(err){
    console.error('SQL error', err);
  }
};

var add = async (table, params, cb)=>{
  await conn;
  try{
    let fieldList = []
    let valueList = []
    let ps = new mssql.PreparedStatement(pool);
    prepareParms(ps, params, fieldList, valueList, [])
    sql = `insert into ${table} (${fieldList.join(',')}) values(${valueList.join(',')})`;
    prepareExec(ps, sql, "", cb)
  }catch(err){
    console.error('SQL error', err);
  }
};


var querySql = async (sql, params, cb)=>{
  try{
    let ps = new mssql.PreparedStatement(pool);
    prepareParms(ps, params, [], [], [])
    prepareExec(ps, sql, params, cb)
  }catch(err){
    console.error('SQL error', err);
  }
};

var select = async (table, top, whereSql, params, orderSql, cb)=>{
  await conn;
  try{
    var ps = new mssql.PreparedStatement(pool);
    top = (top !== "")?`top(${top}) `:top;
    sql = `select ${top} * from ${table} ${whereSql} ${orderSql}`;
    console.log(sql);
    prepareParms(ps, params, [], [], [])
    prepareExec(ps, sql, params, cb)
  }catch(err){
    console.error('SQL error', err);
  }
};

var selectAll = async (table, cb)=>{
  await conn;
  try{
      var ps = new mssql.PreparedStatement(pool);
      var sql = `select * from ${table}`;
      prepareExec(ps, sql, "", cb)
  }catch(err){
      console.error('SQL error', err);
  }
};


exports.select    = select;
exports.selectAll = selectAll;
exports.querySql  = querySql;
exports.add       = add;
exports.update    = update;
exports.del       = del;