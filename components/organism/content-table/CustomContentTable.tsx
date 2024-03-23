import React from 'react';

export interface TOCItem {
    id: string;
    title: string;
    level: number;
    subItems?: TOCItem[];
}

interface Props {
    tocData: TOCItem[];
}

const CustomTOC: React.FC<Props> = ({ tocData }) => {
    const renderTOCItem = (item: TOCItem) => {
        const indentation = `${item.level-1 * 2}rem`; // Adjust indentation based on the level
        return (
            <li key={item.id} className="py-2" style={{ marginLeft: indentation }}>
                <a href={`#${item.id}`} className="flex items-center">
                    <span className="mr-2">○</span>
                    <span className="font-semibold">{item.title}</span>
                </a>
                {item.subItems && (
                    <ul>
                        {item.subItems.map((subItem) => renderTOCItem(subItem))}
                    </ul>
                )}
            </li>
        );
    };

    return (
        <div className=" rounded p-4">
            <div className="font-bold text-lg mb-4">İçerik</div>
            <ul>
                {tocData.map((item) => renderTOCItem(item))}
            </ul>
        </div>
    );
}

export default CustomTOC;
