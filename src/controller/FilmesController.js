import FilmesModel from '../model/model.js';

export default class FilmesController{
    static async findAll(request, response){
        const filme = await FilmesModel.findAll();

        response.status(200).json(filme);
    }


    static async cadastrarFilme(request, response){
        const {titulo,ator,faixa_etaria,genero} = request.body;

        const filmes = {
            titulo, ator, faixa_etaria, genero
        }

        const filmeCriado = await FilmesModel.create(filmes);

        response.status(201).json({filmes: filmeCriado});
        
    }

    static async atualizarFilme(request, response){

        const {id} = request.params;

        const {titulo,ator,faixa_etaria,genero} = request.body;

        if (!titulo || !ator || !faixa_etaria || !genero) {
            return response.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }
        const dadosAtualizados = {titulo, ator, faixa_etaria, genero};
        try {
            const [linhasAfetadas] = await FilmesModel.update(dadosAtualizados, {
                where: { id }
            });
            if (linhasAfetadas === 0) {
                return response.status(404).json({ error: 'Filme não encontrado' });
            }
            const filmeAtualizado = await FilmesModel.findByPk(id);
            return response.status(200).json({ filmes: filmeAtualizado});
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: 'Erro ao atualizar o filme' });
        }
    }
    static async deletarFilme(request, response) {
        const { id } = request.params;

        try {
            const linhasAfetadas = await FilmesModel.destroy({
                where: { id }
            });

            if (linhasAfetadas === 0) {
                return response.status(404).json({ error: 'Filme não encontrado' });
            }

            return response.status(200).json({ message: 'Filme deletado com sucesso' });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: 'Erro ao deletar o filme' });
        }
    }
    
}
