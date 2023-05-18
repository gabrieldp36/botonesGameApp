import React, { useState } from 'react';
import catGif from './assets/img/cat.gif';

let btn1 = true;
let btn2 = true;
let btn3 = true;
let primeraPartida = true;
let letrasArr = [];
let ordenPatidaGanadora = [];
let nroClick = -1;

const asginarLetras = () => {
  let letrasArr = [];
  const min = 65;
  const max = 90;
  let generando = true;
  while(generando) {
    const letra = Math.floor(Math.random()*(max-min+1)+min);
    if(!letrasArr.includes(letra)){
      letrasArr.push(letra);
      if(letrasArr.length === 3) {
        generando = false;
      };
    };
  };
  letrasArr = letrasArr.map( (codigoLetra, index) => { 
    let btn = `btn${index+1}`
    let letraObj = {}
    letraObj[btn] = String.fromCharCode(codigoLetra);
    return letraObj;
  });
  return letrasArr;
};

const checkOrdenClikeo = (btn) => {
  return ordenPatidaGanadora[nroClick] === btn; 
};

// Funcional component.
function Juego() {

  // Estados del componente
  const [jugando, setJugando] = useState(true);
  const [tiempo, setTiempo] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [msgPerdedor, setMsgPerdedor] = useState(null);
  const [cartelAtencion, setCartelAtencion] = useState(false);
  const [activoBtn1, setActivoBtn1] = useState(false);
  const [activoBtn2, setActivoBtn2] = useState(false);
  const [activoBtn3, setActivoBtn3] = useState(false);

  const [mlBtn1, setMlBtn1] = useState(0);
  const [mlBtn2, setMlBtn2] = useState(0);
  const [mlBtn3, setMlBtn3] = useState(0);
  const [mtBtn1, setMtBtn1] = useState(0);
  const [mtBtn2, setMtBtn2] = useState(0);
  const [mtBtn3, setMtBtn3] = useState(0);

  const [btn1Letra, setBtn1Letra] = useState('');
  const [btn2Letra, setBtn2Letra] = useState('');
  const [btn3Letra, setBtn3Letra] = useState('');

  // Funciones.
  const comenzar = () => {
    setResultado('');
    setMsgPerdedor('');
    setCartelAtencion(true);
    if (primeraPartida) {
      setJugando(false);
    };
    establecerPosicion(150,100);
    letrasArr = asginarLetras();
    setBtn1Letra(letrasArr[0].btn1);
    setBtn2Letra(letrasArr[1].btn2);
    setBtn3Letra(letrasArr[2].btn3);
    ordenPatidaGanadora = (
      letrasArr.sort( (a,b) => (Object.values(a)[0] > Object.values(b)[0]) ? 1 : -1)
      .map( letraObj => Object.keys(letraObj)[0] )
    );
    setTimeout(() => {
      setCartelAtencion(false);
      setActivoBtn1(true);
      setActivoBtn2(true);
      setActivoBtn3(true);
      btn1 = true;
      btn2 = true;
      btn3 = true;
      setTiempo(Date.now());
    }, Math.floor(Math.random() * 5000) + 1000);
  };

  // Fijamos la posición en la que parecerán los botones en pantalla
  const establecerPosicion = (y, x) => {
    setMlBtn1(Math.floor(Math.random()*x));
    setMtBtn1(Math.floor(Math.random()*y));
    setMlBtn2(Math.floor(Math.random()*(x*4)));
    setMtBtn2(Math.floor(Math.random()*y));
    setMlBtn3(Math.floor(Math.random()*(x*6)));
    setMtBtn3(Math.floor(Math.random()*y));
  };

  // Listener botón número 1
  const cliqueado = () => {
    setActivoBtn1(false);
    btn1 = false;
    nroClick++;
    if(checkOrdenClikeo('btn1')) {
      if(!btn2 && !btn3 ) {
        ganador();
      };
    } else {
      perdedor();
      setActivoBtn2(false);
      setActivoBtn3(false);
    };

  };

  // Listener botón número 2
  const cliqueado2 = () => {
    setActivoBtn2(false);
    btn2 = false;
    nroClick++;
    if(checkOrdenClikeo('btn2')) {
      if(!btn1 && !btn3 ) {
        ganador();
      };
    } else {
      perdedor();
      setActivoBtn1(false);
      setActivoBtn3(false);
    };
  };

  // Listener botón número 3
  const cliqueado3 = () => {
    setActivoBtn3(false);
    btn3 = false;
    nroClick++;
    if(checkOrdenClikeo('btn3')) {
      if(!btn1 && !btn2 ) {
        ganador();
      };
    } else {
      perdedor();
      setActivoBtn1(false);
      setActivoBtn2(false);
    };
  };

  const ganador = () => {
    setResultado(`Tardaste ${((Date.now() - tiempo)/1000).toFixed(1)} segundos en finalizar.`);
    primeraPartida = false;
    setJugando(false); 
    nroClick = -1;
  };

  const perdedor = () => {
    setMsgPerdedor(`¡No te desanimes, volvé a intentarlo!`);
    primeraPartida = false;
    setJugando(false); 
    nroClick = -1;
  };

  // JSX
  return (
    // Mensaje Inicial
    <div>
      { jugando &&
        <div 
          style=
          {{
            width:'100vw', 
            height:'100vh', 
            display:'grid',
            placeItems: 'center'
          }}
        
        >
          <div
            style={{
              display:'flex',
              flexDirection:'column',
              justifyContent:'center', 
              alignItems:'center', 
              gap: '30px',
              border:'6px solid #37db8c', borderRadius:'20px', 
              padding:'50px', 
              width: 'fit-content'
            }}
          >   
            <h1>¡Botones Game!</h1>
            <h4 className='text-center'>Pulsa las letras en orden alfabético,<br></br>lo más rápido que puedas &#128640; &#128526;</h4>
            <div className='row'  style={{justifyContent:'center', alignItems:'center', gap:'15px'}}>
              <button 
                className='btn btn-info mt'
                onClick={comenzar}
              >
                ¡Comenzar!
              </button>
            </div>
          </div> 
        </div> 
      }
      {/* Cartel que se genera antes de que aparezcan los botones */}
      { cartelAtencion &&
        <div 
          style=
          {{
            width:'100vw', 
            height:'100vh', 
            display:'grid',
            placeItems: 'center'
          }}
        >
          <div 
            className='alert alert-info text-center loading'
          >
            <span style={{fontSize: '20px'}}> &#128269; ¡Presta atención! &#128064; </span>
          </div>
        </div>
      }
      {/* Botones que permiten jugar la partida */}
      {
        <div style={{width:'100%', height:'100%'}}>
          { (activoBtn1 && !msgPerdedor) && 
            <div className='p-4'>
              <button
                className='btn btn-primary'
                onClick={cliqueado} 
                style={{marginTop:`${mtBtn1}px`, marginLeft:`${mlBtn1}px`,  width:'80px'}}
              > 
                { btn1Letra }
              </button>
            </div>
          } 
          { (activoBtn2 && !msgPerdedor) &&   
            <div className='p-4'>
              <button
                className='btn btn-success'
                onClick={cliqueado2} 
                style={{marginTop:`${mtBtn2}px`, marginLeft:`${mlBtn2}px`,  width:'80px'}}
              >
                { btn2Letra }
              </button>
            </div>
          }
          { (activoBtn3 && !msgPerdedor) &&   
            <div className='p-4'>
              <button
                className='btn btn-warning'
                onClick={cliqueado3} 
                style={{marginTop:`${mtBtn3}px`, marginLeft:`${mlBtn3}px`, width:'80px'}}
              >
                { btn3Letra }
              </button>
            </div>
          }
        </div>
      }
      {/* Mensaje de éxito */}
      {resultado &&
        <div 
          style=
          {{
            display:'grid',
            placeItems: 'center',
            width:'100vw', 
            height:'100vh'
          }}
        
        >
          <div
            style={{
              position: 'relative',
              display:'flex',
              flexDirection:'column',
              justifyContent:'center', 
              alignItems:'center', 
              gap: '30px',
              border:'6px solid #37db8c', borderRadius:'20px', 
              padding:'50px', 
              width: 'fit-content'
            }}
          > 
            <div style={{position: 'absolute', left:'-45px', top: '-138px'}}>
              <img src={catGif} width={'250px'} height={'250px'} alt="" />
            </div>
            <h1> &#127881; ¡Ganaste! &#128512; </h1>
            <h4 className='text-center'>{resultado}</h4>
            <div className='row' style={{justifyContent:'center', alignItems:'center', gap:'15px'}}>
              <button 
                className='btn btn-info mt'
                onClick={comenzar}
              >
                ¡Nueva partida!
              </button>
            </div>
          </div> 
        </div> 
      }
      {/* Mensaje derrota */}
      {msgPerdedor &&
        <div 
          style=
          {{
            width:'100vw', 
            height:'100vh', 
            display:'grid',
            placeItems: 'center'
          }}
        
        >
          <div
            style={{
              display:'flex',
              flexDirection:'column',
              justifyContent:'center', 
              alignItems:'center', 
              gap: '30px',
              border:'6px solid #D92626', borderRadius:'20px', 
              padding:'50px', 
              width: 'fit-content'
            }}
          >   
            <h1>Perdiste &#128546;</h1>
            <h4 className='text-center'>{msgPerdedor} &#128170;</h4>
            <div className='row' style={{justifyContent:'center', alignItems:'center', gap:'15px'}}>
              <button 
                className='btn btn-info mt'
                onClick={comenzar}
              >
                ¡Nueva partida!
              </button>
            </div>
          </div> 
        </div> 
      }
    </div>
  );
};

export default Juego;
