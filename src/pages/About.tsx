import MainWrapper from '@/components/layout/main-wrapper'

const About = () => {
  return (
    <MainWrapper>
      <div className="w-full text-center">
        <h2 className="text-2xl mb-4">About</h2>
        <p>このアプリはreactとviteとshadcn/uiで開発されています</p>
        <p>react-hook-formとzodとshadcn/uiのフォームコンポーネントを使用したメモアプリです。</p>
      </div>
    </MainWrapper>
  )
}

export default About