### Intro

$$
\alpha^+ = \arg\min_x 
    \Vert Ax - b\Vert_1
$$


$$
\alpha^+ = \arg\min_x 
    \Vert Ax - b\Vert_2^2
$$

### **Phrasing it as Linear Programming Problem**


$$
\begin{aligned}
    &= \min_{x} \Vert Ax - b\Vert_1 
    \\
    &= \min_{v} \left\lbrace
        v : -v \le Ax - b \le v
    \right\rbrace
\end{aligned}
$$

