class Consumidor {
    nome: string;
    idade: number;
    email: string;

    constructor(nome: string, idade: number, email: string) {
        this.validarNome(nome);
        this.validarIdade(idade);
        this.validarEmail(email);

        this.nome = nome;
        this.idade = idade;
        this.email = email;
    }

    private validarNome(nome: string): void {
        if (nome.trim().length < 2) {
            throw new Error("O nome deve ter pelo menos 2 caracteres.");
        }
    }

    private validarIdade(idade: number): void {
        if (idade < 0 || idade > 120) {
            throw new Error("A idade deve estar entre 0 e 120 anos.");
        }
    }

    private validarEmail(email: string): void {
        if (!email.includes("@") || !email.includes(".")) {
            throw new Error("E-mail inválido.");
        }
    }

    formatarExibicao(): string {
        return `Consumidor: ${this.nome} (${this.idade} anos) - ${this.email}`;
    }

    static calcularMediaIdade(consumidores: Consumidor[]): number {
        if (consumidores.length === 0) {
            return 0;
        }

        const somaIdades = consumidores.reduce(
            (soma, consumidor) => soma + consumidor.idade,
            0
        );

        return somaIdades / consumidores.length;
    }

    static obterExtremosIdade(consumidores: Consumidor[]): {
        maisVelho: Consumidor | undefined;
        maisNovo: Consumidor | undefined;
    } {
        if (consumidores.length === 0) {
            return {
                maisVelho: undefined,
                maisNovo: undefined
            };
        }

        const primeiroConsumidor = consumidores[0];

        if (!primeiroConsumidor) {
            return {
                maisVelho: undefined,
                maisNovo: undefined
            };
        }

        let maisVelho = primeiroConsumidor;
        let maisNovo = primeiroConsumidor;

        for (const consumidor of consumidores) {
            if (consumidor.idade > maisVelho.idade) {
                maisVelho = consumidor;
            }

            if (consumidor.idade < maisNovo.idade) {
                maisNovo = consumidor;
            }
        }

        return {
            maisVelho,
            maisNovo
        };
    }
}


const listaConsumidores: Consumidor[] = [];


try {
    listaConsumidores.push(
        new Consumidor("Ana Silva", 30, "ana@email.com")
    );

    listaConsumidores.push(
        new Consumidor("Carlos Souza", 22, "carlos@email.com")
    );

    listaConsumidores.push(
        new Consumidor("Mariana Lima", 45, "mariana@email.com")
    );

    listaConsumidores.push(
        new Consumidor("Roberto Alves", 19, "roberto@email.com")
    );

    listaConsumidores.push(
        new Consumidor("Fernanda Dias", 33, "fernanda@email.com")
    );

} catch (erro) {
    console.log("Erro ao cadastrar consumidor:", erro);
}


console.log("=== LISTA DE CONSUMIDORES ===");

listaConsumidores.forEach(consumidor => {
    console.log(consumidor.formatarExibicao());
});


console.log("\n=== ANÁLISE ESTATÍSTICA ===");

const media = Consumidor.calcularMediaIdade(listaConsumidores);

console.log(
    `Média das Idades: ${media.toFixed(1)} anos`
);

const { maisVelho, maisNovo } =
    Consumidor.obterExtremosIdade(listaConsumidores);

if (maisVelho !== undefined && maisNovo !== undefined) {

    console.log(
        `Mais Velho(a): ${maisVelho.nome} (${maisVelho.idade} anos)`
    );

    console.log(
        `Mais Novo(a): ${maisNovo.nome} (${maisNovo.idade} anos)`
    );

} else {
    console.log("Não foi possível calcular os extremos de idade.");
}