from math import prod, exp
from scipy.special import gammainc


#
# General helper functions
#

# Calculates x^n/n!
def PowerFactorial(x, n):
    if n == 0:
        return 1
    return prod([x/i for i in range(1, n+1)])


#
# M/M/c system
#

# Calculates p0 for a M/M/c system
def MMcStateP0(a, c):
    result = sum([PowerFactorial(a, K) for K in range(0, c)])
    result = result+PowerFactorial(a, c)*c/(c-a)

    if result > 0:
        return 1/result
    return 0

# Calculates pn for a M/M/c system
def MMcStateP(a, c, n):
    if n == 0:
        return MMcStateP0(a, c)
    if n <= c:
        return PowerFactorial(a, n)*MMcStateP0(a, c)
    return PowerFactorial(a, c)*(a/c)**(n-c)*MMcStateP0(a, c)

# Calculates P1 for a M/M/c system
def ErlangC_P1(a, c):
    return PowerFactorial(a, c)*c/(c-a)*MMcStateP0(a, c)

# Calculates P(W<=t) for a M/M/c system (this is the Erlang-C formula)
def ErlangC(l, mu, c, t):
    a = l/mu
    if a >= c:
        return 0
    return 1-ErlangC_P1(a, c)*exp(-(c-a)*mu*t)

# Calculates E[NQ] for a M/M/c/ system
def ErlangC_ENQ(l, mu, c):
    a = l/mu
    if a >= c:
        return 0
    return ErlangC_P1(a, c)*a/(c-a)

# Calculates E[N] for a M/M/c/ system
def ErlangC_EN(l, mu, c):
    a = l/mu
    if a >= c:
        return 0
    return ErlangC_P1(a, c)*a/(c-a)+a

# Calculates E[W] for a M/M/c/ system
def ErlangC_EW(l, mu, c):
    a = l/mu
    if a >= c:
        return 0
    return ErlangC_P1(a, c)/(c*mu-l)

# Calculates E[V] for a M/M/c/ system
def ErlangC_EV(l, mu, c):
    a = l/mu
    if a >= c:
        return 0
    return ErlangC_P1(a, c)/(c*mu-l)+1/mu


#
# M/M/c/c system
#

# Calculates P1 for a M/M/c/c system (this is the Erlang B formula)
def ErlangB(a, c):
    s = sum([PowerFactorial(a, n) for n in range(0, c+1)])
    return PowerFactorial(a, c)/s


#
# M/M/c/K + M system
#

# Calculates Cn for a M/M/c/K+M system
def MMcKMCn(l, mu, nu, c, n):
    if n <= c:
        return PowerFactorial(l/mu, n)

    result = PowerFactorial(l/mu, c)
    for i in range(1, n-c+1):
        result = result*l/(c*mu+i*nu)

    return result

# Calculates pn for a M/M/c/K+M system
def MMcKMStateP(l, mu, nu, c, K, n):
    p0 = sum([MMcKMCn(l, mu, nu, c, i) for i in range(0, K+1)])
    p0 = 1/p0

    if n == 0:
        return p0
    if n > K:
        return 0

    return MMcKMCn(l, mu, nu, c, n)*p0

# Calculates P(A) for a M/M/c/K+M system
def ExtErlangC_PA(l, mu, nu, c, K):
    if l == 0:
        return 0
    p0 = MMcKMStateP(l, mu, nu, c, K, 0)
    inputReject = MMcKMStateP(l, mu, nu, c, K, K)
    return sum([nu/(l*(1-inputReject))*(n-c)*p0*MMcKMCn(l, mu, nu, c, n) for n in range(c+1, K+1)])

# Calculates P(W<=t) for a M/M/c/K+M system (this is the extended Erlang C formula)
def ExtErlangC(l, mu, nu, c, K, t):
    p0 = MMcKMStateP(l, mu, nu, c, K, 0)

    if p0 == 0:
        p = 1
    else:
        p = 1-p0*MMcKMCn(l, mu, nu, c, K)

    for n in range(c, K):
        a = n-c+1
        x = (c*mu+nu)*t
        g = 1-gammainc(a, x)
        p = p-p0*MMcKMCn(l, mu, nu, c, n)*g

    return p

# Calculates E[NQ] for a M/M/c/K+M system
def ExtErlangC_ENQ(l, mu, nu, c, K):
    p0 = MMcKMStateP(l, mu, nu, c, K, 0)
    return sum([p0*(n-c)*MMcKMCn(l, mu, nu, c, n) for n in range(c+1, K+1)])

# Calculates E[N] for a M/M/c/K+M system
def ExtErlangC_EN(l, mu, nu, c, K):
    p0 = MMcKMStateP(l, mu, nu, c, K, 0)
    return sum([p0*n*MMcKMCn(l, mu, nu, c, n) for n in range(1, K+1)])

# Calculates E[W] for a M/M/c/K+M system
def ExtErlangC_EW(l, mu, nu, c, K):
    if l == 0:
        return 0
    return ExtErlangC_ENQ(l, mu, nu, c, K)/l

# Calculates E[V] for a M/M/c/K+M system
def ExtErlangC_EV(l, mu, nu, c, K):
    if l == 0:
        return 0
    return ExtErlangC_EN(l, mu, nu, c, K)/l
