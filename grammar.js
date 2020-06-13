/* e:nve|te|t..v|t t:n|v v:tA|V n:t[E*]|(E)|(E*)|{[..]E}|N
     dap map cap           avd    ap   parn list   lam     */
module.exports=grammar({name:'k',rules:{k:$=>$._e,

_e:$=>prec.dynamic(-1,choice($.ass,$.dap,$.map,$.cap,$._t,$.exp)),
      ass:$=>prec.dynamic(1,seq(field('v',$._n),field('f',optional($.v)),':',field('a',$._e))),
      exp:$=>seq(':',$._e),
      dap:$=>prec.dynamic(1,seq(field('a',$._n),optional($._sp),field('v',$._v),optional($._sp),field('b',$._e))),
      map:$=>seq(field('f',$._t),optional($._sp),field('a',$._e)),
      cap:$=>prec.dynamic(1,seq(choice(field('ca',$.cap),field('ta',$._t)),field('b',$._v))),
_v:$=>choice($.avd,$.v), avd:$=>seq(field('f',$._t),field('a',$.a)),
_t:$=>choice($._n,$._v),
_n:$=>choice($.ap,$.parn,$.list,$.n,$.lam),

parn:$=>seq('(',$._e,')'),
list:$=>seq('(',optional($.seq),')'),
ap:  $=>prec(1,seq(field('f',$._e),'[',field('a',optional($.seq)),']')),

args:$=>seq($.var,repeat(seq(';',$.var))),
seq: $=>seq($._e,repeat(seq($._semi,$._e))),
lam: $=>seq('{[',field('v',optional($.args)),']',field('b',optional($.seq)),'}'),

n:   $=>choice($.int1,$.intv,$.flt1,$.var),

int1:$=>seq(optional('-'),$._pint1), _pint1:$=>/\d+/,
intv:$=>seq(optional('-'),$._pintv), _pintv:$=>/\d+( -?\d+)+/,
flt1:$=>seq(optional('-'),$._pflt1), _pflt1:$=>/(\d+\.|\d*\.\d+)(e-?\d+)?/,

v:$=>choice('-',/[+*%!&|<>=~,^#_$?@.]/), _sp:$=>' ',
a:$=>/[\/\\\']:?/,

var: $=>/[a-z][a-z0-9]*/, _semi:$=>/[;\n]/

},conflicts:$=>[[$.dap,$._t],[$.parn,$.seq],[$.cap,$._t],[$.ass,$.dap,$._t],[$.ass,$._v],[$.dap,$.map],
                [$.int1,$.v],[$.flt1,$.v],[$.n,$.intv],[$.intv],[$.intv,$.v]],
  extras:$=>[]
})
