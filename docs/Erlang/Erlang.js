'use strict';

/*
 * Allgemeine Hilfsfunktionen
 */

/* Berechnet x^n/n! */
function PotenzFakultaet(x,n) {
  if (n==0) return 1;
  let prod=1;
  for (let i=1;i<=n;i++) prod*=x/i;
  return prod;
}



/*
 * M/M/c-System
 */

/* Berechnet p0 für ein M/M/c-System */
function MMcZustandsP0(a,c) {
  let sum=0;
  for (let K=0;K<c;K++) sum+=PotenzFakultaet(a,K);
  sum+=PotenzFakultaet(a,c)*c/(c-a);

  if (sum>0) return 1/sum;
  return 0
}

/* Berechnet pn für ein M/M/c-System */
function MMcZustandsP(a,c,n) {
  if (n==0) return MMcZustandsP0(a,c);
  if (n<=c) return PotenzFakultaet(a,n)*MMcZustandsP0(a,c);
  return PotenzFakultaet(a,c)*Math.pow(a/c,n-c)*MMcZustandsP0(a,c);
}

/* Berechnet P1 für ein M/M/c-System */
function ErlangC_P1(a,c) {
    return PotenzFakultaet(a,c)*c/(c-a)*MMcZustandsP0(a,c);
}

/* Berechnet P(W<=t) für ein M/M/c-System (also die Erlang-C-Formel) */
function ErlangC(lambda,mu,c,t) {
  const a=lambda/mu;
  if (a>=c) return 0;
  return 1-ErlangC_P1(a,c)*Math.exp(-(c-a)*mu*t);
}

/* Berechnet E[NQ] für ein M/M/c/-System */
function ErlangC_ENQ(lambda,mu,c) {
  const a=lambda/mu;
  if (a>=c) return 0;
  return ErlangC_P1(a,c)*a/(c-a);
}

/* Berechnet E[N] für ein M/M/c/-System */
function ErlangC_EN(lambda,mu,c) {
  const a=lambda/mu;
  if (a>=c) return 0;
  return ErlangC_P1(a,c)*a/(c-a)+a;
}

/* Berechnet E[W] für ein M/M/c/-System */
function ErlangC_EW(lambda,mu,c) {
  const a=lambda/mu;
  if (a>=c) return 0;
  return ErlangC_P1(a,c)/(c*mu-lambda);
}

/* Berechnet E[V] für ein M/M/c/-System */
function ErlangC_EV(lambda,mu,c) {
  const a=lambda/mu;
  if (a>=c) return 0;
  return ErlangC_P1(a,c)/(c*mu-lambda)+1/mu;
}



/*
 * M/M/c/c - System
 */

/* Berechnung von P1 für ein M/M/c/c-System (d.h. Berechnung der Erlang-B-Formel) */
function ErlangB(a,c) {
  let sum=0;
  for (let n=0;n<=c;n++) sum+=PotenzFakultaet(a,n);
  return PotenzFakultaet(a,c)/sum;
}



/*
 * M/M/c/K + M - System
 */

/* Berechnung von Cn für ein M/M/c/K+M-System */
function MMcKMCn(lambda,mu,nu,c,n) {
  const a=lambda/mu;
  if (n<=c) return PotenzFakultaet(a,n);
  let prod=PotenzFakultaet(a,c);
  for (let i=1;i<=n-c;i++) prod*=lambda/(c*mu+i*nu);
  return prod;
}

/* Berechnet pn für ein M/M/c/K+M-System */
function MMcKMZustandsP(lambda,mu,nu,c,K,n) {
  let p0=0;
  for (let i=0;i<=K;i++) p0+=MMcKMCn(lambda,mu,nu,c,i);
  p0=1/p0;

  if (n==0) return p0;
  if (n>K) return 0;
  return MMcKMCn(lambda,mu,nu,c,n)*p0;
}

/* Berechnet P(A) für ein M/M/c/K+M-System */
function ErwErlangC_PA(lambda,mu,nu,c,K) {
  const p0=MMcKMZustandsP(lambda,mu,nu,c,K,0);
  const inputReject=MMcKMZustandsP(lambda,mu,nu,c,K,K);
  let sum=0;
  for (let n=c+1;n<=K;n++) sum+=nu/(lambda*(1-inputReject))*(n-c)*p0*MMcKMCn(lambda,mu,nu,c,n);
  return sum;
}

/* Log-Gamma-Funktion  */
function gammaln(x) {
  let j = 0;
  const cof = [
    76.18009172947146, -86.50532032941677, 24.01409824083091,
    -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5
  ];
  let ser = 1.000000000190015;
  let xx, y, tmp;
  tmp = (y = xx = x) + 5.5;
  tmp -= (xx + 0.5) * Math.log(tmp);
  for (; j < 6; j++)
    ser += cof[j] / ++y;
  return Math.log(2.5066282746310005 * ser / xx) - tmp;
};

/* Untere regularisierte unvollständige Gamma-Funktion P(a,x) */
function lowRegGamma(a,x) {
  const aln = gammaln(a);
  let ap = a;
  let sum = 1 / a;
  let del = sum;
  let b = x + 1 - a;
  let c = 1 / 1.0e-30;
  let d = 1 / b;
  let h = d;
  let i = 1;
  const ITMAX = -~(Math.log((a >= 1) ? a : 1 / a) * 8.5 + a * 0.4 + 17); /* calculate maximum number of iterations required for a */
  let an;

  if (x < 0 || a <= 0) {
    return NaN;
  } else if (x < a + 1) {
    for (; i <= ITMAX; i++) {
      sum += del *= x / ++ap;
    }
    return (sum * Math.exp(-x + a * Math.log(x) - (aln)));
  }

  for (; i <= ITMAX; i++) {
    an = -i * (i - a);
    b += 2;
    d = an * d + b;
    c = b + an / c;
    d = 1 / d;
    h *= d * c;
  }

  return (1 - h * Math.exp(-x + a * Math.log(x) - (aln)));
};

/* Berechnung von P(W<=t) für ein M/M/c/K+M-System (also die erweiterte Erlang-C-Formel) */
function ErwErlangC(lambda,mu,nu,c,K,t) {
  const p0=MMcKMZustandsP(lambda,mu,nu,c,K,0);

  let p;
  if (p0==0) p=1; else p=1-p0*MMcKMCn(lambda,mu,nu,c,K);

  for (let n=c;n<K;n++) {
    const a=n-c+1;
    const x=(c*mu+nu)*t;
    const g=1-lowRegGamma(a,x);
    p-=p0*MMcKMCn(lambda,mu,nu,c,n)*g;
  }

  return p;
}

/* Berechnet E[NQ] für ein M/M/c/K+M-System */
function ErwErlangC_ENQ(lambda,mu,nu,c,K) {
    const p0=MMcKMZustandsP(lambda,mu,nu,c,K,0);
    let sum=0;
    for (let n=c+1;n<=K;n++) sum+=p0*(n-c)*MMcKMCn(lambda,mu,nu,c,n);
    return sum;
}

/* Berechnet E[N] für ein M/M/c/K+M-System */
function ErwErlangC_EN(lambda,mu,nu,c,K) {
  const p0=MMcKMZustandsP(lambda,mu,nu,c,K,0);
  let sum=0;
  for (let n=1;n<=K;n++) sum+=p0*n*MMcKMCn(lambda,mu,nu,c,n);
  return sum;
}

/* Berechnet E[W] für ein M/M/c/K+M-System */
function ErwErlangC_EW(lambda,mu,nu,c,K) {
  return ErwErlangC_ENQ(lambda,mu,nu,c,K)/lambda;
}

/* Berechnet E[V] für ein M/M/c/K+M-System */
function  ErwErlangC_EV(lambda,mu,nu,c,K) {
  return ErwErlangC_EN(lambda,mu,nu,c,K)/lambda;
}