import AuthRepository from './AuthRepository'
import TestRepository from './TestRepository'
import MainRepository from './MainRepository'
import ArticleRepository from './ArticleRepository'
import PodcastRepository from './PodcastRepository'
import BlogRepository from './BlogRepository'
import AcademyRepository from './AcademyRepository'
import AcademyPanelRepository from './AcademyPanelRepository'
import AcademyProductPanelRepository from './AcademyProductPanelRepository'
import AcademyProductRepository from './AcademyProductRepository'
import OtherRepository from './OtherRepository'
import PanelRepository from './PanelRepository'
import SharedPanel from './SharedPanel'

export default (request) => ({
    auth: AuthRepository(request),
    test: TestRepository(request),
    main: MainRepository(request),
    article: ArticleRepository(request),
    podcast: PodcastRepository(request),
    blog: BlogRepository(request),
    academy:AcademyRepository(request),
    academyPanel:AcademyPanelRepository(request),
    academyProductPanel:AcademyProductPanelRepository(request),
    academyProduct: AcademyProductRepository(request),
    other:OtherRepository(request),
    panel:PanelRepository(request),
    sharedPanel:SharedPanel(request),
})