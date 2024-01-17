import TestRepository from './TestRepository'
import ArticleRepository from './ArticleRepository'
import PodcastRepository from './PodcastRepository'
import VideoRepository from './VideoRepository'
import BlogRepository from './BlogRepository'
import CommunityRepository from './CommunityRepository'
import AuthRepository from './AuthRepository'
import OtherRepository from './OtherRepository'
import PanelRepository from './PanelRepository'
import AcademyRepository from './AcademyRepository'
import SharedPanel from './SharedPanel'
import AcademyPanelRepository from './AcademyPanelRepository'
import CommunityPanelRepository from './CommunityPanelRepository'

export default (request) => ({
    auth: AuthRepository(request),
    test: TestRepository(request),
    article: ArticleRepository(request),
    podcast: PodcastRepository(request),
    video: VideoRepository(request),
    blog: BlogRepository(request),
    community: CommunityRepository(request),
    other:OtherRepository(request),
    panel:PanelRepository(request),
    academy:AcademyRepository(request),
    sharedPanel:SharedPanel(request),
    academyPanel:AcademyPanelRepository(request),
    communityPanel:CommunityPanelRepository(request)
})