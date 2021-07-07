$$
\begin{aligned}
    \widetilde{M}[i, j, k] = 
    \sum_{\alpha = i - \frac{m}{2}}^{i  + \frac{m}{2}}
    \sum_{\beta = j - \frac{n}{2}}^{j - \frac{n}{2}}
        \frac{1}{mn}
            M \left[ 
                \alpha \% \text{Height}, 
                \beta \% \text{Width}, 
                k
                \right]
\end{aligned}
$$

$$
\text{vec}(M) = 
\begin{bmatrix}
    M[1, :, 1]
    \\
    M[2, :, 1]
    \\
    \vdots
    \\
    M[\text{Height}, :1]
    \\
    M[1, :, 2]
    \\
    M[2, :, 2]
    \\
    \vdots
    \\
    M[\text{Height}, :2]
    \\
    M[1, :, 3]
    \\
    M[2, :, 3]
    \\
    \vdots
    \\
    M[\text{Height}, :3]
\end{bmatrix}
$$

$$
\exist A \in \mathbb{R}^{(\text{Height} \times \text{Width})\times(\text{Height} \times \text{Width})}
: \text{vec}(\widetilde{M}) = A \text{vec}(M) \wedge A^T =
$$