const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'arkademy'
});

app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM produk',
    (error, results) => {
      res.render('index.ejs', {items: results});
    }
  );
});

app.get('/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/create', (req, res) => {
  console.log(req.body);
  connection.query(
    "INSERT INTO produk (nama_produk, keterangan, harga, jumlah) VALUES (?,?,?,?)",
    [req.body.nama_produk, req.body.keterangan,req.body.harga,req.body.jumlah,],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.post('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM produk WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.get('/edit/:id', (req, res) => {
  connection.query(
    'SELECT * FROM produk WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {item: results[0]});
    }
  );
});

app.post('/update/:id', (req, res) => {
  // Ketik code untuk memperbarui item yang dipilih
  connection.query (
  'UPDATE produk SET nama_produk = ?, keterangan = ?, harga = ?, jumlah = ?  WHERE id = ?',
  [req.body.nama_produk, req.body.keterangan, req.body.harga, req.body.jumlah, req.params.id],
  (error, results) => {
    res.redirect('/index');
  }
  );
  // Hapus code pengalihan ke halaman daftar
 
});

app.listen(3000);
