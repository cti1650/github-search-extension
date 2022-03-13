import React, { useEffect, useState } from 'react';
import { TextBox } from '@components/TextBox';
import { Buttons } from '@components/Button';
import { Title } from '@components/Title';
import { useGitHubSearch } from 'src/hooks/useGitHubSearch';
import { Layout } from '@components/Layout';

const Pages = () => {
    const [keyword, setKeyword] = useState('')
    const [exclusionKeyword, setExclusionKeyword] = useState('')
    const [extensionKeyword, setExtensionKeyword] = useState('')
    const handleClick = (event) => {
        const { Open } = useGitHubSearch({ keyword, exclusionKeyword, extensionKeyword })
        Open(event.target.innerText)
    }
    return (
        <>
            <Layout title={'GitHub Search Extension'}>
                <TextBox
                    value={keyword}
                    onChange={setKeyword}
                    label='Keyword'
                    placeholder='Search or jump to… ( keyword )'
                    holder='search_keyword' />
                <TextBox
                    value={exclusionKeyword}
                    onChange={setExclusionKeyword}
                    label='Exclusion'
                    placeholder='Add keywords for searching ( -keyword )'
                    holder='search_exclusion_keyword' />
                <TextBox
                    value={extensionKeyword}
                    onChange={setExtensionKeyword}
                    label='File or Extension'
                    placeholder='file extension keyword ( tsx,ts )'
                    holder='search_file_extension_keyword' />
                <Buttons
                    label='Search Type'
                    buttons={[
                        { label: 'Code', onClick: handleClick },
                        { label: 'Repositories', onClick: handleClick }
                    ]}
                />
            </Layout>
        </>
    );
};

export default Pages;
